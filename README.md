# webpack-symlink-plugin
before webpack compile, create directory symlink.

# 📦 Install

```sh
npm install @wauto/webpack-symlink-plugin
```

# 🔨 Usage

```js
const WebpackSymlinkPlugin = require("@wauto/webpack-symlink-plugin");

const webpackConfig = {
    plugins: [
        new WebpackSymlinkPlugin(options),
    ],
};

module.exports = webpackConfig;
```

## Options and Defaults

```js
new WebpackSymlinkPlugin({
    // multi symlink maps
    symlinkList: [
        {
            // absolute path to source
            src: "path/to/src/directory",
            // absolute path to destination
            dest,
        },
    ],
    // success callback
    onSuccess: function() {},
})

```