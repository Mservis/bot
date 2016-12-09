function Utils() {
    this.Cc = Components.classes;
    this.Ci = Components.interfaces;
    this.vbBranch = "ru.mail.vb.";
    this.prefSvc = this.Cc["@mozilla.org/preferences;1"].getService(this.Ci.nsIPrefBranch);
    //this.prefSvc = this.Cc["@mozilla.org/preferences-service;1"].getService(this.Ci.nsIPrefService);
    //this.globalPrefs_ = this.Cc["@mozilla.org/preferences;1"].getService(this.Ci.nsIPrefBranch);
    //this.prefs_ = this.prefSvc.getBranch(this.vbBranch);
    this.prefs_ = this.prefSvc;
    this.prefs_.QueryInterface(Ci.nsIPrefBranchInternal);
    this.DEBUG = false;
}

Utils.prototype.consoleBash = function(msg) {
    if (this.DEBUG) {
        var console = this.Cc['@mozilla.org/consoleservice;1'].getService(this.Ci.nsIConsoleService);
        if (Object.prototype.toString.call(msg) != "[object String]") {
            for (var key in msg) {
                console.logStringMessage("    " + key + ': ' + msg[key] + "\n");
            }
        } else {
            console.logStringMessage(msg);
        }
    }
};

Utils.prototype.setterMap_ = {
    string : "setCharPref",
    "boolean" : "setBoolPref",
    number : "setIntPref"
};
Utils.prototype.getterMap_ = {};
Utils.prototype.getterMap_[this.Ci.nsIPrefBranch.PREF_STRING] = "getCharPref";
Utils.prototype.getterMap_[this.Ci.nsIPrefBranch.PREF_BOOL] = "getBoolPref";
Utils.prototype.getterMap_[this.Ci.nsIPrefBranch.PREF_INT] = "getIntPref";

Utils.prototype.setBranch = function(branch) {
    return
}

Utils.prototype.getPref = function(key, defaultVal) {
    var type = this.prefs_.getPrefType(key);
    if (type == this.Ci.nsIPrefBranch.PREF_INVALID) return defaultVal;
    if (type == this.Ci.nsIPrefBranch.PREF_STRING && !this.noUnicode_) return this.getUnicodePref(key, defaultVal);
    var meth = this.getterMap_[type];
    if (!meth)
        throw new Error("Pref datatype {" + type + "} not supported.");
    try {
        return this.prefs_[meth](key)
    } catch (e) {
        return defaultVal
    }
};

Utils.prototype.setPref = function(key, val) {
    var datatype = typeof val;
    if (datatype == "number" && val % 1 != 0)
        throw new Error("Cannot store non-integer numbers in preferences.");
    if (datatype == "string" && !this.noUnicode_)
        return this.setUnicodePref(key, val);
    var meth = this.setterMap_[datatype];
    if (!meth)
        throw new Error("Pref datatype {" + datatype + "} not supported.");
    return this.prefs_[meth](key, val)
};

// Utils.prototype.getGlobalPref = function(key, defaultVal) {
//     return this.globalPrefs_.getCharPref(key, defaultVal);
// };

Utils.prototype.setUnicodePref = function(key, value) {
    var s = this.Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);
    s.data = value;
    return this.prefs_.setComplexValue(key, Ci.nsISupportsString, s)
};

Utils.prototype.getUnicodePref = function(key, opt_default) {
    try {
        return this.prefs_.getComplexValue(key, this.Ci.nsISupportsString).data
    } catch (e) {
        return opt_default
    }
};

function alert (msg, opt_title) {
    opt_title = opt_title || "message";
    if (msg == null) {
        msg = "null";
    }
    Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService).alert(null, opt_title, msg.toString());
};
function $(id) {
  return mailRuVB.doc.getElementById(id);
}