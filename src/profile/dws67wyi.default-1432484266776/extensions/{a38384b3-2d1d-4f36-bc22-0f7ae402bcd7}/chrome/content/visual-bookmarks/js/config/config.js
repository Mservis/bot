(function (app){

    app.config = {
        "debug": false,
        "bookmarks_count": 9,
        "default_bookmarks-update": 4,
        "update_period": 2 * 1440 * 60000,
        "statistics": {
            "drag_bookmarks": 1377662,
            "remove_bookmarks": 1341706,
            "go_bookmarks": 1341704,
            "add_bookmarks": 1341705,
            "update_bookmarks": 1341707,
            "search_suggest": 1341698,
            "search_button_click": 1341689,
            "search_enter_press": 1341699,
            "select_theme": 1341708,
            "select_default_theme": 1341709,
            "leaf_themes": 1341710,
            "traffic": 1341717
        },
        "default_bookmarks": [
            {
                index: 4,
                url:'http://mail.ru',
                //hiddenUrl:'http://r.mail.ru/clb1341713/mail.ru/cnt/1360187/',
                hiddenUrl: 'https://r.mail.ru/clb1341713/mail.ru/cnt/10723067',
                title:'Mail.Ru',
                background:'images/thumbnails/mail.ru.jpeg',
                ico:'moz-anno:favicon:http://mail.ru',
                captureState:'received'
            }

        ],
        "themes":[
            {
                value:'body__bg-fabric',
                title:'Ткань'
            },
            {
                value:'body__bg',
                title:'Стандартная'
            },
            {
                value:'body__bg-11',
                title:'Зелень'
            },
            {
                value:'body__bg-12',
                title:'Дерево'
            },
            {
                value:'body__bg-2',
                title:'Кожа'
            },
            {
                value:'body__bg-cookies',
                title:'Печенье',
                default: true
            },
            {
                value:'body__bg-mosaic',
                title:'Мозаика'
            },
            {
                value:'body__bg-9',
                title:'Шиповник'
            },
            {
                value:'body__bg-8',
                title:'Ромбы'
            },
            {
                value:'body__bg-1',
                title:'Волны'
            },
            {
                value:'body__bg-5',
                title:'Волны'
            },
            {
                value:'body__bg-4',
                title:'Зимняя'
            },
            {
                value:'body__bg-3',
                title:'Леденцы'
            },
            {
                value:'body__bg-6',
                title:'Листва'
            },
            {
                value:'body__bg-7',
                title:'Подсолнухи'
            },
            {
                value:'body__bg-10',
                title:'Домики'
            },
            {
                value:'body__bg-13',
                title:'Сладости'
            },
            {
                value:'body__bg-14',
                title:'Светлое дерево'
            },
            {
                value:'body__dark',
                title:'Тёмная'
            },
            {
                value:'body__bg-wall',
                title:'Стена'
            },
            {
                value:'body__bg-flax',
                title:'Лён'
            }
        ]
    };

})(app);
