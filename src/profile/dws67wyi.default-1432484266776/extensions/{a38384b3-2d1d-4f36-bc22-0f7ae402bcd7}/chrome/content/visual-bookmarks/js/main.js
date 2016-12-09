var app = app || {};

function getReferrer() {
	// REFACTORME:
    // NIET!!!
	try {
		var data = Components.classes["@mozilla.org/preferences;1"]
			.getService(Components.interfaces.nsIPrefBranch)
			.getComplexValue("extensions.{a38384b3-2d1d-4f36-bc22-0f7ae402bcd7}.info",
				Components.interfaces.nsISupportsString).data;
        return JSON.parse(data).gp;
	} catch (e) {
		return "";
	}
}

window.onload = function(){
    var paneEl = $('#pane-container')[0];
    ko.applyBindings({pane: new app.Pane()}, paneEl);

    var tab = Object.create(app.tabStrip);
    tab.init($('#tab')[0]);

    app.core.startAll();

		var rfr = getReferrer();
		if (rfr) {
			$('#search__form__rfr').attr('value', encodeURIComponent(rfr));
		}
};
