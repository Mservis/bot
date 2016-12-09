(function (core) {
    var sqliteStorage = {};
    var file = Components.classes["@mozilla.org/file/directory_service;1"]
                .getService(Components.interfaces.nsIProperties)
                .get("ProfD", Components.interfaces.nsIFile);
    var storageService = Components.classes["@mozilla.org/storage/service;1"]
                            .getService(Components.interfaces.mozIStorageService);
    var mDBConn = null;
    var tableName = 'visualBookmarks';

    file.append("MRSputnikData");
    if( !file.exists() || !file.isDirectory() ) {
       file.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0777);
    }
    file.append("MailRu.sqlite");

    mDBConn = storageService.openDatabase(file);

    function create() {
        mDBConn.createTable(tableName, "id integer primary key autoincrement, Name_key TEXT, Key_value TEXT");
        mDBConn.executeSimpleSQL('CREATE UNIQUE INDEX idx_name_key ON ' + tableName + ' (Name_key)');
    }

    sqliteStorage.getItem = function (key) {
        var statement = null;
        var result;

        if (!mDBConn.tableExists(tableName)) {
            create();
        }
        statement = mDBConn.createStatement("SELECT Key_value FROM " + tableName + " where Name_key = '" + key + "'");
        while (statement.step()) {
            result = statement.row['Key_value'];
        }

        return result;
    };

    sqliteStorage.setItem = function (key, value) {
        if (!mDBConn.tableExists(tableName)) {
            create();
        }
        mDBConn.executeSimpleSQL("REPLACE INTO " + tableName + " (Name_key, Key_value) VALUES ('"+key+"', '"+value+"')");
        
        core.events.trigger({type: 'sqliteStorage', data: [{'key':key, 'newValue': value}]});
    };

    sqliteStorage.removeItem = function (key) {
        if (!mDBConn.tableExists(tableName)) {
            create();
        }
        mDBConn.executeSimpleSQL("DELETE FROM " + tableName + " WHERE Name_key = '"+key+"'");
    };

    sqliteStorage.getAllItems = function (key) {
        var statement = null;
        var result = [];

        if (!mDBConn.tableExists(tableName)) {
            create();
        }
        statement = mDBConn.createStatement("SELECT Name_key, Key_value FROM " + tableName + "");
        while (statement.step()) {
            result.push({'name': statement.row['Name_key'], 'value': statement.row['Key_value']});
        }

        return result;
    };

    core.sqliteStorage = sqliteStorage;
})(app.core);