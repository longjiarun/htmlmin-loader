var utils = require('loader-utils'),
    assign = require('object-assign'),
    minify = require('html-minifier').minify,
    path = require('path');

module.exports = function(source) {
    this.cacheable && this.cacheable();
    var opts = this.options['htmlmin-loader'] || utils.parseQuery(this.query) || {};

    opts = assign({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS:true,
        minifyCSS:true
    }, opts);

    //minify html
    source = minify(source, opts);

    return source;
};