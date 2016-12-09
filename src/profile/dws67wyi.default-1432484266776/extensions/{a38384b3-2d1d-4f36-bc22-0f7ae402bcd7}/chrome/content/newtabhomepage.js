function newtabhomepage(parent) {
    this.parent_ = parent;
    this.timeoutId = null;
    this.newTab = null;
}
newtabhomepage.prototype.init = function() {
    this.parent_.utils.consoleBash('init');
    var url = this.createUrl();
    gInitialPages.push(url);

//    if (!this.oldVersionVB()) {
//        if (this.psvc.prefHasUserValue('browser.newtab.url')) {
//            if(this.psvc.getCharPref("browser.newtab.url", '') != url) {
//                this.toolbarObject.mPrefs.setPref('visualbookmarks', false);
//            }
//        } else {
//            this.toolbarObject.mPrefs.setPref('visualbookmarks', false);
//        }
//    }

    if (this.oldVersionVB()) {
        this.parent_.utils.setPref(this.parent_.utils.vbBranch + 'visualbookmarksforc', true);
    }

    this.wrapperOpenTab();
};

newtabhomepage.prototype.wrapperOpenTab = function() {
    var funDef = '' + window.BrowserOpenTab;
    var url = this.createUrl();
    if (!this.parent_.utils.getPref(this.parent_.utils.vbBranch + 'visualbookmarksforc', false)) {
        return;
    }
    this.wrapperOpenWin();
    if (this.parent_.utils.getPref(this.parent_.utils.vbBranch + 'visualbookmarks', true)) {
        //if(!~funDef.indexOf('openUILinkIn(BROWSER_NEW_TAB_URL')) {
            window.BrowserOpenTab = function () {
                openUILinkIn(url, "tab");
                setTimeout(function() {
                    getBrowser().selectedTab.label = 'Mail.Ru: Визуальные закладки';
                    gURLBar.select();
                }, 200);
            };
        //}
    }

    this.timeoutId = setTimeout(this.wrapperOpenTab.bind(this), 200);
};

newtabhomepage.prototype.wrapperOpenWin = function() {
//    function MyWindowObserver() {
//        this.observe=function(aSubject, aTopic, aData) {
//            G_Debug(this, "===========================window event: " + aTopic);
//            //and this is where the bugs origins because opening this alert will cause a window-open
//            //event and the call of this method again (forever)
//        }
//    }
//    var ww = Cc["@mozilla.org/embedcomp/window-watcher;1"].getService(Ci.nsIWindowWatcher);
//    ww.registerNotification(new MyWindowObserver());

}
newtabhomepage.prototype.oldVersionVB = function() {
    var addons = this.parent_.utils.getPref("extensions.enabledAddons", '');
    var versionYVb = null;
    return true;
    addons = addons.split(',');
    for (var i = 0; i < addons.length; i++) {
        if (/vb.+yandex.ru:.+/.test(addons[i])) {
            versionYVb = addons[i].split(':')[1];
        }
    }
    if (versionYVb) {
        if (versionYVb.split('.')[0] <= 2 && versionYVb.split('.')[1] < 5) {
            return true;
        } else {
            return false;
        }

    }

    return false;
}

newtabhomepage.prototype.removeWrapper = function() {
    clearTimeout(this.timeoutId);
    window.BrowserOpenTab = function() {
        openUILinkIn(BROWSER_NEW_TAB_URL, "tab");
    }
}

newtabhomepage.prototype.createUrl = function () {
    var ref = this.parent_.utils.getPref('mail.ru.toolbar.referer', '');
    var pref = '';
    if(ref != '') {
        pref = '?referer=' + ref;
    }

    this.newTab = "chrome://vbmail.ru/content/visual-bookmarks/visual-bookmarks.html" + pref;

    return this.newTab;
}


newtabhomepage.prototype.show = function() {
    this.parent_.utils.consoleBash('show');
    var url = this.createUrl();

    if(this.parent_.utils.getPref(this.parent_.utils.vbBranch + 'visualbookmarks', true)) {
        this.parent_.utils.setPref("browser.newtab.url", url);
    }
}

newtabhomepage.prototype.hide = function() {
    this.parent_.utils.setPref("browser.newtab.url", 'about:newtab');
}


newtabhomepage.prototype.update = function() {
    if(this.parent_.utils.getPref(this.parent_.utils.vbBranch + 'visualbookmarks', true)) {
        this.show();
        this.wrapperOpenTab();
    } else {
        this.hide();
        this.removeWrapper();
    }

}