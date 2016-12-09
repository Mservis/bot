var newtabhomepage;
var savedBranch = {};
var savedKeys = [];
var Cc = Components.classes;
var Ci = Components.interfaces;

var mailRuVB = {};
var id = '{a38384b3-2d1d-4f36-bc22-0f7ae402bcd7}';

window.addEventListener("load", function() {
	mailRuVB.main();
});
window.addEventListener("unload", function(e) {

});

Components.utils.import("chrome://vbmail.ru/content/loader.js");
loader(this, 'chrome://vbmail.ru/content/', id, "1.0.0.52", Components);

mailRuVB.main = function () {
	this.doc = document;
	this.win = window;
	this.utils = new Utils();
	this.utils.DEBUG = true;
	newtabhomepage = this.newtabhomepage =  new newtabhomepage(this);
	this.newtabhomepage.init();

	//Components.utils.import("chrome://vbmail.ru/content/metrics.jsm");
	//MetricsInterface.setExtensionId("{a38384b3-2d1d-4f36-bc22-0f7ae402bcd7}");
	//MetricsInterface.sendIfNecessary();

  	var distributionModuleFactory = require("./fx-metrics");
	var options = {
	  "kind": "ff_xtnvbm",
	  "comp": "vbm",
	};
	distributionModuleFactory(options).initialize();
};

Components.utils.import("resource://gre/modules/AddonManager.jsm");

var listener = {
	onUninstalling: function(addon) {
		if (addon.id == id) {
			newtabhomepage.hide();
        	newtabhomepage.removeWrapper();


			var branchName = 'extensions.' + id + '.';
			var prefService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
			savedKeys = prefService.getChildList(branchName);

			for (var i = 0; i < savedKeys.length; i++) {
				var key = savedKeys[i];
				var value = prefService.getComplexValue(key, Ci.nsISupportsString).data;
				savedBranch[key] = value;
			}

			prefService.deleteBranch(branchName);
		}
	},
	onOperationCancelled: function(addon) {
		if (addon.id == id) {
    	    newtabhomepage.show();
	        newtabhomepage.wrapperOpenTab();

			var prefService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);

			for (var i = 0; i < savedKeys.length; i++) {
				var key = savedKeys[i];
			    var str = Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);
    			str.data = savedBranch[key];

				prefService.setComplexValue(key, Ci.nsISupportsString, str);
			}
		}
	}
};

AddonManager.addAddonListener(listener);
