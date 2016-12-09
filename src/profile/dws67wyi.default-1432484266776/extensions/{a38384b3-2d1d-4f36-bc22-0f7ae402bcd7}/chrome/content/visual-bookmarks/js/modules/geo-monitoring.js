(function(app){

    app.core.define('geo-monitoring', function(f){

        var geo,
            isGeoInitialized = false,
            domain = 'http://mail.ru',
            cookieName = 's',
            timeout = 1 * 60 * 1000,
            timeoutId = null;

        return {
            init: function(){
                var that = this;

                (function f(){

                    that.checkCookie(function(){
                        timeoutId = window.setTimeout(f, timeout);
                    });

                })();
            },
            destroy: function(){
                if(timeoutId != null){
                    window.clearTimeout(timeoutId);
                }

                geo = timeoutId = null;
            },
            getCookie: function(){
                var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
                var uri = ios.newURI("http://mail.ru/", null, null);
                var cookieSvc = Components.classes["@mozilla.org/cookieService;1"].getService(Components.interfaces.nsICookieService);
                var cookie = cookieSvc.getCookieString(uri, null) || '';
                var matchS = cookie.match(/\s=([^;]*)/);
                return matchS;
            },
            checkCookie: function(callback){
                var that = this;
                var sCookieValue = that.getCookie();

                if (sCookieValue) {
                    var cookieObj = that.parseCookie(sCookieValue);
                    var newGeo = cookieObj.geo;

                    if (!isGeoInitialized) {
                        isGeoInitialized = true;
                    } else if(newGeo != geo) {
                        f.publish({
                            type: 'geo-change',
                            data: [newGeo]
                        });
                    }

                    geo = newGeo;
                }

                callback();

            },
            parseCookie: function(cookieValue){
                var obj = {};

                cookieValue.replace( /(\w+)\=(.*?)(\||$)/g, function($0, $1, $2) {
                    obj[$1] = $2;
                });

                return obj;
            }

        }

    });

})(app);




