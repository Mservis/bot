var app = app || {};

window.onload = function(){
    app.core.startAll();
}

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    if(!removeInfo.isWindowClosing) {
        chrome.tabs.query({windowId: removeInfo.windowId}, function (data) {
            console.log(data);
            if(data.length == 0) {
                chrome.windows.create({width:screen.width, height:screen.height}, function(window) {
//                    chrome.windows.update(window.id, {state: "maximized"});
                });
                //chrome.windows.create({url: 'chrome://newtab'});
                //chrome.tabs.create({url: 'chrome://newtab'});
            }
        });
    }
});