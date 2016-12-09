(function(app){

    app.core.define('#news', function(f){

        var informer,

            parseResponse = function(response){
                var result = response;

                if (typeof response == 'string') {
                    result = JSON.parse(response);
                }

                return result;
            },

            responseHandler = function(response) {
                var newsItems = parseResponse(response);

                view(newsItems);
                save(newsItems);
            },

            save = function(newsItems) {

                var saveData = {data: newsItems, timeUpdate: new Date().getTime()};
                app.core.storage.set('visual-bookmarks.news', saveData);
            },

            errorHandler = function() {
                var oldData = app.core.storage.get('visual-bookmarks.news');
                if (oldData) {
                    view(oldData.data);
                }
            },

            view = function(items) {
                var newsHtml = '';
                var urlSearch = 'http://go.mail.ru/news?fr=ffvbm1.0.0.52&fr2=news&q=';
                var newsBox = $('#news .news_items_wraper');

                newsBox.html('');
                for (var key in items) {
                    newsHtml += '<a class="news_item" style="background-image:url(\'' + items[key].image + '\');" href="' + urlSearch + items[key].query_text + '">'
                                + ' <div class="news_title">'
                                + '     <h3>' + items[key].text + '</h3>'
                                + ' </div>'
                                + '</a>';
                }

                newsBox.append(newsHtml);

                //$('#news .news_item').click(openNews);
                $('.news_next').click(scrollNext);
                $('.news_back').click(scrollBack);
            },

            openNews = function(e) {
                var query = $(this).attr('data-query');

            },

            scrollNext = function(e) {
                var newScroll = $("#news .news_items_scroll")[0].scrollLeft + 186 * 3;
                if (newScroll + $("#news .news_items_scroll").width() >= $("#news .news_items_wraper").width()) {
                    $('.news_next').addClass('disabled');
                }

                $('.news_back').removeClass('disabled');
                $("#news .news_items_scroll").animate({
                    scrollLeft: newScroll
                }, 200);
            },

            scrollBack = function(e) {
                var newScroll = $("#news .news_items_scroll")[0].scrollLeft - 186 * 3;
                if (newScroll <= 0) {
                    $('.news_back').addClass('disabled');
                }
                $('.news_next').removeClass('disabled');;

                $("#news .news_items_scroll").animate({
                    scrollLeft: newScroll
                }, 200);
            };

        return {
            init: function(){

                var fun = function(){
                    var url = 'http://internet.go.mail.ru/bfeed',
                        timeout = 20 * 60 * 1000;

                    informer = Object.create(app.informer);
                    informer.init({
                        timeout: timeout,
                        dataUrl: url,
                        handleResponse: responseHandler,
                        handleError: errorHandler
                    });

                    informer.start();
                };

                var oldData = app.core.storage.get('visual-bookmarks.news');
//                var start = 0;
                if (!oldData || new Date().getTime() - oldData.timeUpdate > 20 * 60 * 1000) {
                    fun();
                } else {
                    view(oldData.data);
                }

                //window.setTimeout(fun, start);

            },
            destroy: function(){

                informer.stop();

            }
        }

    });

})(app);



