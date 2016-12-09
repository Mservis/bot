(function(app){
    var updates = [];
    var collectionUpdates = [];

    function update_1(bookmark) {
        if (bookmark.statCounterId() == 1341712) {
            bookmark.url('http://news.mail.ru');
            bookmark.background('http://r.mail.ru/clb1341703/news.mail.ru/');
            bookmark.title('Новости');
            bookmark.background('http://img.imgsmail.ru/p/vb/sc/news.jpg');
            bookmark.ico('chrome://favicon/http://news.mail.ru');
            bookmark.captureState('received');
        }
    }
    updates.push(update_1);

    function update_2(bookmark) {
        if (bookmark.statCounterId()) {
            var url = (bookmark.hiddenUrl() || bookmark.url()).replace(/^\w+\:\/\//, '');

            url =  'http://r.mail.ru/clb' + bookmark.statCounterId() + '/' + url;
            bookmark.hiddenUrl(url);
            bookmark.statCounterId(null);
        }
    }
    updates.push(update_2);

    function update_3(bookmark) {
        switch (bookmark.url()) {
            case 'http://mail.ru':
                bookmark.background('http://img.imgsmail.ru/p/vb/sc/mail.ru.jpeg');
                bookmark.hiddenUrl('https://r.mail.ru/clb1341713/mail.ru/cnt/10723067');
                break;
            case 'http://calendar.mail.ru':
                bookmark.background('http://img.imgsmail.ru/p/vb/sc/calendar.mail.ru.jpeg');
                bookmark.hiddenUrl('http://r.mail.ru/clb1341711/calendar.mail.ru/');
                break;
            case 'http://news.mail.ru':
                bookmark.background('http://img.imgsmail.ru/p/vb/sc/news.jpg');
                bookmark.hiddenUrl('http://r.mail.ru/clb1341703/news.mail.ru/');
                break;
            default:
                break;
        }
    }
    updates.push(update_3);

    function collectionUpdate_1(bookmarksHash) {
        var bookmarks =  bookmarksHash;

        function exist(bookmark) {
            for (var index in bookmarks) {
                if (bookmarks.hasOwnProperty(index) &&
                    bookmark.url == bookmarks[index].url()) {
                    return true;
                }
            }

            return false;
        }

        function getEmptyCellIndex() {
            var ids = [];

            for (var index in bookmarks) {
                if (bookmarks.hasOwnProperty(index)) {
                    ids.push(bookmarks[index].index());
                }
            }

            for (var i = 1; i <= maxCount; i++) {
                if (ids.indexOf(i) == -1) {
                    return i;
                }
            }
        }

        var maxCount  = app.config.bookmarks_count;
        var count = app.utils.keys(bookmarks).length;
        var freeCellCount = maxCount - count;
        var defaultBookmarks = app.config.default_bookmarks.splice(3);


        for (var i = 0; i < defaultBookmarks.length; i++) {
            var bookmarkData = defaultBookmarks[i];

            if (freeCellCount > 3 && !exist(bookmarkData)) {
                var index = getEmptyCellIndex();
                var model = new app.BookmarkModel(bookmarkData);

                model.index(index);
                bookmarks[index] = model;
                model.dataSync();
                freeCellCount--;
            }
        }

    }
    collectionUpdates.push(collectionUpdate_1);

    function run(bookmarksHash) {

        var configUpdateVersion = app.config["default_bookmarks-update"]
        var versionKey = 'visual-bookmarks.default-bookmark_updated';
        var version = app.core.storage.get(versionKey);

        if (version < configUpdateVersion) {

            for (var index in bookmarksHash) {
                if (bookmarksHash.hasOwnProperty(index)) {
                    var bookmark = bookmarksHash[index];

                    updates.forEach(function(update){
                        update(bookmark);
                    });

                    bookmark.dataSync();
                }
            }

            collectionUpdates.forEach(function(update){
                update(bookmarksHash);
            });

        }

        app.core.storage.set(versionKey, configUpdateVersion);
    }

    app.updates = {
        run: run
    };

})(app);

