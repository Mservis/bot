(function (core) {
    var visibleTab = {};
    var hiddenWindow = Components.classes["@mozilla.org/appshell/appShellService;1"]
                            .getService(Components.interfaces.nsIAppShellService)
                            .hiddenDOMWindow;
    var browserWindow = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow('navigator:browser');
    hiddenWindow.innerWidth = 1024;
    hiddenWindow.innerHeight = 768;
    var GUID = null;
    var finishCallback = null;

    function createWindow() {


//        var url = options.url;
//        var GUID = options.requestGUID;
//        var options = {
//            url:url,
//            focused:false,
//            left:10000,
//            top:10000,
//            type:'popup',
//            height:1,
//            width:1
//        };
    }

    function checkOnLoad() {
        if(hiddenWindow.document.readyState == 'complete'){
            this.doCaptureWin();
            return;
        }
        setTimeout(checkOnLoad.bind(this), 2000);
    }

    visibleTab.start = function (options, callback) {
        createWindow();
        GUID = options.requestGUID;
        finishCallback = callback;
        hiddenWindow.document.location = options.url;
        setTimeout(checkOnLoad.bind(this), 2000);
    };

    visibleTab.doCaptureWin = function() {
        var canvas = browserWindow.document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
        var ctx = canvas.getContext("2d");
        var width = 1024;
        var height = 768;

        var iframeData = hiddenWindow;//.contentWindow;
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        ctx.drawWindow(iframeData, 0, 0, width,height, "rgb(255,255,255)");
        var scrin = canvas.toDataURL("image/png");
        this.scaleCapture(scrin, function (url) {
            core.fileSystem.writeThumbnail(url, GUID, function(data) {
                finishCallback(data);
            }.bind(this));
        });
    };

    visibleTab.scaleCapture = function(urlData, callback) {
            console.log('scaleCapture');
            if (!urlData) {
                return;
            }

            var canvas_ratio = 4 / 3,
                canvas_width = 480,
                canvas_height = canvas_width / canvas_ratio;

            var canvas = browserWindow.document.createElementNS("http://www.w3.org/1999/xhtml", "html:canvas");
            var context = canvas.getContext("2d");
            //var image = browserWindow.document.createElement("img");
            var image = browserWindow.document.createElementNS('http://www.w3.org/1999/xhtml', 'img');

            function onImageLoad() {
                console.log('onImageLoad');
                var image_height,
                    image_width,
                    image_ratio = image.width / image.height,
                    image_left = 0,
                    image_top = 0;

                if (canvas_ratio > image_ratio) {
                    image_width = canvas_width;
                    image_height = Math.ceil(image_width / image_ratio);
                }
                else {
                    image_height = canvas_height;
                    image_width = Math.ceil(image_height * image_ratio);
                }

                if (image_width > canvas_width) {
                    image_left = -Math.ceil((image_width - canvas_width) / 2);
                }


                canvas.width = canvas_width;
                canvas.height = canvas_height;
                context.drawImage(image, image_left, image_top, image_width, image_height);

                var url = canvas.toDataURL("image/jpeg", "");

                callback(url);
            }

            image.onload = onImageLoad;
            image.src = urlData;
    };


    core.visibleTab = visibleTab;
})(app.core);