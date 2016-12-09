function loader(exports, rootURI, addonId, version, components) {
  const { Loader: { Loader, Require, Module, main } } =
        components.utils.import("resource://gre/modules/commonjs/toolkit/loader.js", {});

  const loader = Loader({
    id: addonId,
    version: version,
    rootURI: rootURI,
    paths: {
      "": rootURI,
      'sdk/': 'resource://gre/modules/commonjs/sdk/'
    }
  });

  const require = (id, options={}) => {
    const { reload, all } = options;
    const requirerURI = components.stack.caller.filename;
    const requirer = Module(requirerURI, requirerURI);
    const require = Require(loader, requirer);
    return require(id);
  };

  require.resolve = id => {
    const requirerURI = components.stack.caller.filename;
    const requirer = Module(requirerURI, requirerURI);
    return Require(loader, requirer).resolve(id);
  };

  exports.require = require;
}

var EXPORTED_SYMBOLS = [ "loader" ];