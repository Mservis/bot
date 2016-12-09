(function (core) {
    var fileSystem = {};
    var size = 20 * 1024 * 1024;

    window.requestFileSystem = window.webkitRequestFileSystem || window.requestFileSystem;

    function toArray(list) {
        return Array.prototype.slice.call(list || [], 0);
    }

    function errorHandler(error) {
        var message;

        try {
            message = JSON.stringify(error);
        } catch (ex) {
            message = error.toString();
        }

        throw 'FileSystem Error:: ' + message;
    }

    function requestFileSystem(callback, errorHandler) {
        window.requestFileSystem(window.PERSISTENT, size, callback, errorHandler);
    }

    fileSystem.listFiles = function (callback) {
        var that = this;

        requestFileSystem(function (fs) {
            var dirReader = fs.root.createReader();
            var entries = [];

            var readEntries = function () {
                dirReader.readEntries(function (results) {
                    if (!results.length) {
                        callback(entries.sort());
                    } else {
                        entries = entries.concat(toArray(results));
                        readEntries();
                    }
                }, errorHandler);
            };

            readEntries();

        }, errorHandler);

    }

    fileSystem.removeFile = function (fileName, callback) {
        console.log(fileName);
        var file = Components.classes["@mozilla.org/file/directory_service;1"]
                     .getService(Components.interfaces.nsIProperties)
                     .get("ProfD", Components.interfaces.nsIFile);

        file.append("MRSputnikData");
        file.append("thumbnails");
        file.append(fileName);
        try {
            file.remove(false);
        } catch (e) {
            console.log('NOT FOUND: ' + e);
        }

        if (callback) {
            callback();
        }
        return;
//        var that = this;
//
//        requestFileSystem(function (fs) {
//
//            fs.root.getFile(fileName, {create:false}, function (fileEntry) {
//
//                fileEntry.remove(function () {
//                    if (callback) {
//                        callback();
//                    }
//                }, errorHandler);
//
//            }, errorHandler);
//
//        }, errorHandler);
    }

    fileSystem.removeAllFiles = function () {
        var that = this;

        that.listFiles(function (entries) {
            entries.forEach(function (entry) {
                that.removeFile(entry.name);
            });
        });

    }

    fileSystem.writeThumbnail = function (dataUrl, fileName, callback) {
        var file = Components.classes["@mozilla.org/file/directory_service;1"]
                     .getService(Components.interfaces.nsIProperties)
                     .get("ProfD", Components.interfaces.nsIFile);
        var ioService = Components.classes['@mozilla.org/network/io-service;1']
                            .getService(Components.interfaces.nsIIOService);
        var stream = Components.classes["@mozilla.org/network/safe-file-output-stream;1"]
                        .createInstance(Components.interfaces.nsIFileOutputStream);

        file.append("MRSputnikData");
        file.append("thumbnails");
        if( !file.exists() || !file.isDirectory() ) {
            file.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0660); //0660
        }
        file.append(fileName);
        if( !file.exists() || !file.isFile() ) {
            file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0660); //0660
        }

        if (dataUrl.indexOf("data:") != 0) {
            console.log("it isn't available to determine a mime type");
            return;
        }

        var data = dataUrl.substr(dataUrl.indexOf(",") + 1);
        data = window.atob(data);

        stream.init(file, 0x04 | 0x08 | 0x20, 0600, 0);
        stream.write(data, data.length);
        if (stream instanceof Components.interfaces.nsISafeOutputStream) {
            stream.finish();
        } else {
            stream.close();
        }

        callback(ioService.newFileURI(file).spec);

        return;


        var that = this;

//        if (dataUrl.indexOf("data:") != 0) {
//            errorHandler("it isn't available to determine a mime type");
//            return;
//        }
//
//        var contentType = dataUrl.substr(5, dataUrl.indexOf(";") - 5);
//
//        var data = dataUrl.substr(dataUrl.indexOf(",") + 1);
//        data = window.atob(data);
//
//        var buffer = new ArrayBuffer(data.length);
//        var array = new Uint8Array(buffer);
//
//        for (var i = 0; i < data.length; i++) {
//            array[i] = data.charCodeAt(i);
//        }
//
//        requestFileSystem(function (fs) {
//            fs.root.getFile(fileName, {create:true}, function (fileEntry) {
//
//                fileEntry.createWriter(function (fileWriter) {
//
//                    fileWriter.onwriteend = function () {
//                        callback(fileEntry.toURL());
//                    };
//                    fileWriter.onerror = errorHandler;
//
//                    var blob;
//
//                    try {
//                        blob = new Blob([array], {type:contentType});
//                    } catch (ex) {
//                        var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder;
//                        var builder = new BlobBuilder();
//                        builder.append(buffer);
//                        blob = builder.getBlob(contentType);
//                    }
//
//                    fileWriter.write(blob);
//
//                }, errorHandler);
//
//            }, errorHandler);
//
//        }, errorHandler);

    }


    core.fileSystem = fileSystem;
})(app.core);
