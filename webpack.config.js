const path = require ("path")
const webpack = require ("webpack")

module.exports = {
    entry: path.join (__dirname, "src", "scripts", "main.js"),
    output: {
        path: path.join (__dirname, "src", "dist"),
        filename: "build.js",
    },
    target: "electron",
    module: {
        loaders: [
            {
                test: /\.s[a|c]ss$/,
                loader: "style-loader!css-loader!sass-loader",
            },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
            {
                test: /\.vue$/,
                loader: "vue-loader",
                query: {
                    loaders: {
                        scss: "style-loader!css-loader!sass-loader",
                    },
                },
            },
        ],
    },
}
