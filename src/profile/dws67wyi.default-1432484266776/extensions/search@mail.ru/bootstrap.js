
var FR_VALUE = "ffxtn1.0.8";
var SEARCH_URL = "http://go.mail.ru/search?fr=" + FR_VALUE;
var SUGGESTS_URL = "https://suggests.go.mail.ru/sg_u?fr=" + FR_VALUE + "&q=";
var PREFERENCES_BRANCH;

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
Components.utils.import("resource://gre/modules/Timer.jsm");

var Cc = Components.classes;
var Ci = Components.interfaces;

function isSearchString(string) {
	var addressExpressions = [
		/^[\w\-]+:/
		,/^localhost/
		,/[\/\\]/
		,/[\.]/
	];
	return !addressExpressions.some(function(expression) {
		return expression.test(string);
	});
}

function getSearchUrlForQuery(query) {
		url = SEARCH_URL;

		try {
			var branch = Components.classes["@mozilla.org/preferences;1"]
				.getService(Ci.nsIPrefBranch);
			var data = branch.getComplexValue(PREFERENCES_BRANCH + "info",
				Ci.nsISupportsString).data;
			var gp = JSON.parse(data).gp;

			if (gp) {
				url += "&gp=" + encodeURIComponent(gp);
			}
		} catch (e) {}

		return url + "&q=" + encodeURIComponent(query);
}

function windowsObserver(window, topic) {
	if (topic != "domwindowopened") {
		return;
	}

	window.addEventListener("load", function() {
		this.removeEventListener("load", arguments.callee, false);
		if (window.location.href == 'chrome://browser/content/browser.xul') {
			injectIntoWindow(window);
		}
	}, false);
}

function injectIntoWindows() {
	var wwClass = Components.classes["@mozilla.org/embedcomp/window-watcher;1"];
	var ww = wwClass.getService(Components.interfaces.nsIWindowWatcher);
	ww.registerNotification(windowsObserver);

	var wmClass = Components.classes["@mozilla.org/appshell/window-mediator;1"];
	var wm = wmClass.getService(Components.interfaces.nsIWindowMediator);
	enumerator = wm.getEnumerator("navigator:browser");
	while (enumerator.hasMoreElements()) {
		var window = enumerator.getNext();
		injectIntoWindow(window);
	}
}

function reloadBinding(node) {
		return node && node.parentNode && node.parentNode.insertBefore(node, node.nextSibling)
}

function injectIntoWindow(window) {
	if (window.hasOwnProperty("_injection_data_mr")) {
		return;
	}

	URLBar = window.gURLBar;

	window._injection_data_mr = {
		urlbarHandleCommand: URLBar.handleCommand,
		urlbarAutocompletesearch: URLBar.getAttribute("autocompletesearch")
	}

	setTimeout(function() {
		URLBar.setAttribute("autocompletesearch", "mailru-autocomplete");
	}, 0);

	URLBar.handleCommand = function(event) {
		modifyUrlbarValueBeforeGo(this, event);

		if (window._injection_data_mr.urlbarHandleCommand) {
			window._injection_data_mr.urlbarHandleCommand.apply(this, [event]);
		}
	}

	reloadBinding(URLBar);

	setSearchContainerVisible(window, false);
}

function clearWindowsInjection() {
	var wwClass = Components.classes["@mozilla.org/embedcomp/window-watcher;1"];
	var ww = wwClass.getService(Components.interfaces.nsIWindowWatcher);
	ww.unregisterNotification(windowsObserver);

	var wmClass = Components.classes["@mozilla.org/appshell/window-mediator;1"];
	var wm = wmClass.getService(Components.interfaces.nsIWindowMediator);
	enumerator = wm.getEnumerator("navigator:browser");
	while (enumerator.hasMoreElements()) {
		var window = enumerator.getNext();

		setSearchContainerVisible(window, true)

		if (window.hasOwnProperty("_injection_data_mr")) {
			URLBar = window.gURLBar;
			URLBar.handleCommand = window._injection_data_mr.urlbarHandleCommand;
			URLBar.setAttribute("autocompletesearch",
				window._injection_data_mr.urlbarAutocompletesearch);
			delete window._injection_data_mr;
			reloadBinding(URLBar);
		}
	}
}

function setSearchContainerVisible(window, visible) {
		var searchContainer = window.document.getElementById('search-container');
		if (searchContainer != undefined) {
			searchContainer.hidden = !visible;
		}
}

function modifyUrlbarValueBeforeGo(bar, event) {
	if (isSearchString(bar.value)) {
		bar.value = getSearchUrlForQuery(bar.value);
	}
}

/////////////////////// SUGGESTS ///////////////////////////////////////

function loadComponent(component, enable) {
	var registrar = Components.manager.QueryInterface(Components.interfaces.nsIComponentRegistrar)
	var CONTRACT_ID = component.prototype.contractID

	try {
		if (registrar.isContractIDRegistered(CONTRACT_ID)) {
			registrar.unregisterFactory(
				registrar.contractIDToCID(CONTRACT_ID),
				registrar.getClassObjectByContractID(CONTRACT_ID, Components.interfaces.nsISupports)
			);
		}
	} catch(e) {}

	if (!enable) {
		return
	}

	var cp = component.prototype;
	var factory = XPCOMUtils.generateNSGetFactory([component])(cp.classID);
	var result = registrar.registerFactory(cp.classID, cp.classDescription, cp.contractID, factory);
}

function EmptyLoadListener() { }
EmptyLoadListener.prototype = {
	notifyCertProblem: function(socketInfo, status, targetSite) { return true; },
	notifySSLError: function(socketInfo, error, targetSite) { return true; },
	getInterface: function SSLL_getInterface(iid) { return this.QueryInterface(iid); },
	QueryInterface: XPCOMUtils.generateQI([Ci.nsIBadCertListener2, Ci.nsISSLErrorListener, Ci.nsIInterfaceRequestor])
};

function SuggestsSearch() {}
SuggestsSearch.prototype = {
	classDescription: "Mail.ru suggests search",
	classID: Components.ID("847891D4-7007-47F5-A672-0E93AC5714C0"),
	contractID: "@mozilla.org/autocomplete/search;1?name=mailru-autocomplete",
	QueryInterface: XPCOMUtils.generateQI(
		[Components.interfaces.nsIAutoCompleteSearch]
	),

	startSearch: function(searchString, searchParam, previousResult, listener) {
		this.listener = listener;
		this.startSuggestsRequest(searchString);
		return true;
	},

	stopSearch: function() {
		return true;
	},

	startSuggestsRequest: function(searchString) {
		var httpRequest = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance();
		httpRequest.addEventListener("load", this.onSuggestsLoaded.bind(this), false);
		httpRequest.open("GET", SUGGESTS_URL + searchString, true);
		httpRequest.channel.notificationCallbacks = new EmptyLoadListener();
		httpRequest.send();
		return true;
	},

	onSuggestsLoaded: function(event) {
		if(!this.listener) {
			return;
		}

		var request = event.target;
		var json = request.responseText;

		try {
			var object = JSON.parse(json);
		} catch(e) {
			return;
		}

		var resultList = [];

		if (object.sites) {
			object.sites.forEach(function(element) {
				resultList.push({
					title: element.text,
					comment: element.desc,
					icon: "data:image/ico;base64," + element.favicon,
					url: element.golink
				});
			});
		}

		if (object.items) {
			object.items.forEach(function(element) {
				resultList.push({
					title: "\u041f\u043e\u0438\u0441\u043a \"" + element.text + "\"",
					comment: element.text,
					url: getSearchUrlForQuery(element.text)
				});
			});
		}

		var results = new AutoCompleteResult(resultList, object.terms.query);
		this.listener.onSearchResult(this, results);
		return true;
	}
};

function AutoCompleteResult(list, searchString, defaultIndex) {
	this.setResultList(list)
	this._searchString = searchString;
	this._defaultIndex = defaultIndex == null ? -1 : defaultIndex;
}
AutoCompleteResult.prototype = {
	_searchResult: 0,
	_searchString: "",
	_defaultIndex: 0,
	_errorDescription: "",
	list: [],

	setSearchResult: function(val) this._searchResult = val,
	setDefaultIndex: function(val) this._defaultIndex = val,
	setSearchString: function(aSearchString) {},
	setErrorDescription: function(aErrorDescription) {},
	appendMatch: function(aValue,aComment,aImage, aStyle) {},
	setListener: function(aListener) {},

	setResultList: function(list, defItem) {
		if (list) {
			var status = (list.length?'SUCCESS':'NOMATCH')
			this.list = list;
			this._defaultIndex = defItem ? list.indexOf(defItem) : -1
		} else {
			var status = 'FAILURE';
		}

		this._searchResult = Components.interfaces.nsIAutoCompleteResult['RESULT_' + status];
	},

	get searchResult() this._searchResult,
	get searchString() this._searchString,
	get defaultIndex() this._defaultIndex,
	get errorDescription() this._errorDescription,
	get matchCount() this.list.length,

	getCommentAt: function(index) { return this.getElementAttribute(index, "comment") },
	getLabelAt: function(index) { return this.getElementAttribute(index, "title") },
	getValueAt: function(index) { return this.getElementAttribute(index, "url") },
	getImageAt: function(index) { return this.getElementAttribute(index, "icon") },
	getStyleAt: function(index) { return this.getElementAttribute(index, "type") },
	getFinalCompleteValueAt: function(index) { return this.getValueAt(index); },

	getElementAttribute: function(index, attribute) {
		if (this.list[index] && this.list[index][attribute]) {
			return this.list[index][attribute];
		}
		return "";
	},

	removeValueAt: function(index, removeFromDb) {
			this.list.splice(index, 1);
	},

	QueryInterface: XPCOMUtils.generateQI([ Ci.nsIAutoCompleteResult, Ci.nsIAutoCompleteSimpleResult ])
};

/////////////////////// IMPLEMENT BOOTSTRAP API ////////////////////////
function startup(data, reason) {
	PREFERENCES_BRANCH = "extensions." + data.id + ".";

	loadComponent(SuggestsSearch, true);
	injectIntoWindows();

	Components.utils.import("chrome://mail.ru.search/content/loader.js");
	loader(this, "chrome://mail.ru.search/content/", data.id, data.version, Components);

	var distributionModuleFactory = require("chrome://mail.ru.search/content/fx-metrics.js");
	var options = {
	  "kind": "ff_xtndse",
	  "comp": "dse",
	};
	distributionModuleFactory(options).initialize();
}

function shutdown() {
	clearWindowsInjection();
}

function install() {}

function uninstall(data, reason) {
	if (reason === ADDON_UNINSTALL) {
		var prefService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
		prefService.deleteBranch("extensions." + data.id + ".");
	}
}
