
var FR_VALUE = "ffhp1.0.3";
var HOMEPAGE_URL = "https://mail.ru/cnt/11956636";
var PREFERENCES_BRANCH;

var Ci = Components.interfaces;
var Cc = Components.classes;
var Cu = Components.utils;

Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://gre/modules/Services.jsm");

function getUnicodePref(name, defVal) {
    try {
			return Services.prefs.getComplexValue(name, Ci.nsIPrefLocalizedString).data;
    } catch (e) {
			return defVal;
    }
}

function getIntPref(name, defVal) {
	try {
		return Services.prefs.getIntPref(name);
	} catch (e) {
		return defVal;
	}
}

function StoredHomepage() {
	this._homepagePref = "browser.startup.homepage";
	this._pagePref = "browser.startup.page";
	this._homepageBundle = "chrome://branding/locale/browserconfig.properties";
	this.type = getIntPref(this._pagePref, 1);
	this.url = getUnicodePref(this._homepagePref);
	if (!this.url) {
		this.url = Services.strings.createBundle(this._homepageBundle)
			.GetStringFromName(this._homepagePref);
	}
	console.log(this.url);
}

StoredHomepage.prototype.save = function() {
	if (this.type !== 1) {
		Services.prefs.setIntPref(this._pagePref, this.type);
	} else {
		Services.prefs.clearUserPref(this._pagePref);
	}
	if (this.url) {
		Services.prefs.setCharPref(this._homepagePref, this.url);
	}
}

////////////////////////////////////////////////////////////////

HomepageChanger = {
	_lastHomepagePref: function() PREFERENCES_BRANCH + "lastHomepage",
	_lastPagePref: function() PREFERENCES_BRANCH + "lastPageType",

	patch: function() {
		var homepage = HOMEPAGE_URL + "?fr=" + FR_VALUE;

		try {
			var data = getUnicodePref(PREFERENCES_BRANCH + "info");
			var gp = JSON.parse(data).gp;

			if (gp) {
				homepage += "&gp=" + encodeURIComponent(gp);
			}
		} catch (e) {
		}

		var storedHP = new StoredHomepage();
		if (storedHP.url && !storedHP.url.startsWith(HOMEPAGE_URL)) {
			Services.prefs.setCharPref(this._lastHomepagePref(), storedHP.url);
			Services.prefs.setIntPref(this._lastPagePref(), storedHP.type);
		}

		storedHP.url = homepage;
		storedHP.type = 1;
		storedHP.save();
	},

	restore: function() {
		var storedHP = new StoredHomepage();
		storedHP.url = getUnicodePref(this._lastHomepagePref());
		storedHP.type = getIntPref(this._lastPagePref());
		storedHP.save();
	}
}

/////////////////////// IMPLEMENT BOOTSTRAP API ////////////////////////

function startup(data, reason) {
	PREFERENCES_BRANCH = "extensions." + data.id + ".";

	function patch() {
		HomepageChanger.patch();
	}

	Components.utils.import("chrome://mail.ru.homepage/content/loader.js");
	loader(this, "chrome://mail.ru.search/content/", data.id, data.version, Components);

	var distributionModuleFactory = require("chrome://mail.ru.homepage/content/fx-metrics.js");
	var options = {
	  "kind": "ff_xtnhp",
	  "comp": "hp",
	};
	distributionModuleFactory(options).initialize().then(patch, patch);
}

function shutdown(data, reason) {
	if (reason == ADDON_DISABLE || reason == ADDON_UNINSTALL) {
		HomepageChanger.restore();
	}
}

function install() {}

function uninstall(data, reason) {
	if (reason === ADDON_UNINSTALL) {
		var prefService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
		prefService.deleteBranch("extensions." + data.id + ".");
	}
}
