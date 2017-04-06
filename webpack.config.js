const path = require ("path")
const webpack = require ("webpack")

module.exports = {
    entry: path.join (__dirname, "src", "scripts", "main.js"),
    output: {
        path: path.join (__dirname, "src", "dist"),
        filename: "main.js",
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                query: {
                    loaders: {
                        scss: "css-loader!sass-loader",
                    },
                },
            },
        ],
    },
}
