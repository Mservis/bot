(function(app){

    app.core.define('edit-dialog', function(f){

        var DialogViewModel = function (dialog, bookmarkInstance) {
                var self = this,
                    url = bookmarkInstance && bookmarkInstance.url(),
                    title = bookmarkInstance && bookmarkInstance.title();

                this.url = ko.observable(url);
                this.title = ko.observable(title);
                this.history = ko.observableArray([]);
                this.isHistoryRendered = ko.observable(false);
                this.caption = ko.computed(function () {
                    return (bookmarkInstance.isEmpty() ? 'Создание' : 'Редактирование') + ' визуальной закладки';
                });

                this.save = function () {
                    var url = this.url(),
                        title = this.title();

                    if (!url) {
                        return;
                    }
                    f.sendStats(bookmarkInstance.isEmpty() ? "add_bookmarks" : "update_bookmarks");
                    bookmarkInstance.ts(f.getTimestamp()).url(url).title(title);

                    dialog.close();
                };

                this.cancel = function () {
                    dialog.close();
                };

                this.onHistoryRetrieved = function (history) {
                    this.history(history);
                    this.isHistoryRendered(true);
                };

                this.onURLBlur = function () {
                    var url = f.trim(this.url());

                    url = f.fixupURL(url);
                    this.url(url);
                };

                this.choiceSiteFromHistory = function (site) {
                    self.url(site.url).title(site.title);
                };
                
                
                getHistory(f.proxy(this.onHistoryRetrieved, this));
                
            },
            
            getHistory = function (callback) {
                  //Надо вернуть
//                id: "494"
//                lastVisitTime: 1370850011151.983
//                title: "Новости@Mail.Ru: Курсы валют"
//                typedCount: 0
//                url: "http://news.mail.ru/currency.html?charcode=USD"
//                visitCount: 1
                //chrome.history.search({text:"", maxResults:256}, f.proxy(this.onHistoryRetrieved, this));
                //callback();
                
                var historyService = Components.classes["@mozilla.org/browser/nav-history-service;1"].getService(Components.interfaces.nsINavHistoryService);
                var query = historyService.getNewQuery();
                var options = historyService.getNewQueryOptions();
                var history = null;
                var result = [];
                
                options.maxResults = 20 * 2;
                options.sortingMode = options.SORT_BY_DATE_DESCENDING;
                history = (historyService.executeQuery(query, options)).root;
                history.containerOpen = true;
                
                for (var i = 0; i < history.childCount && i < 20; i++) {
                     var node = history.getChild(i);
                     if (!/^https?|file$/.test(node.uri))
                        continue;

                    if (/\.swf$/.test(node.uri))
                        continue;
                    
                     result.push({
                         'title': node.title,
                         'url': node.uri,
                         'favicon': node.icon
                     });
                }
                
                callback(result);
            },
            
            openEditDialog = function (bookmarkModel) {

                var dialog = f.dialog({
                        content:{
                            "data-bind":"template: {name: 'edit-dialog'}"
                        }
                    }, "edit"),
                    view = new DialogViewModel(dialog, bookmarkModel);

                ko.applyBindings(view, dialog.elem);
            }


        return {
            init:function () {
                f.subscribe({
                    'edit-dialog': openEditDialog
                });
            },

            destroy:function () {
                f.unsubscribe({
                    'edit-dialog': openEditDialog
                });
            }

        }

    });

})(app);

