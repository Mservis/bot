var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-37842806-2']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

if(window.jQuery) {
    jQuery.error = function (message) {
        _gaq.push(['_trackEvent', 'jQuery Error', message, navigator.userAgent, 0, true]);
    }
}

window.onerror = function(msg, url, line){
    _gaq.push(['_trackEvent', 'JS Error', msg, navigator.userAgent + ' -> ' + url + " : " + line, 0, true]);

    return true;
}
