var through = require('through2');
var Path = require('path');
function toStream(text) {
    var stream = through();
    stream.write(text);
    return stream;
}

function parsePath(path) {
    var extname = Path.extname(path);
    return {
        dirname: Path.dirname(path),
        basename: Path.basename(path, extname),
        extname: extname
    };
}

function camelize(str) {
    return str.replace(/-+(.)?/g, function(match, chr) {
        return chr ? chr.toUpperCase() : ''
    })
}

//模块文件
/*!(function(root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(root);
    }else if (typeof define === "function") {
        define(function() {
            return factory(root);
        });
    } else {
        root.template_moduleName = factory(root);
    }
}(this, function(root) {
    return obj.text ;
}));*/

function template(text,moduleName){
    var obj = {
        text:JSON.stringify(text)
    };
    return '!(function(root, factory) {if (typeof module !== "undefined" && module.exports) {module.exports = factory(root); }else if (typeof define === "function") {define(function() {return factory(root); }); } else {root.template_'+moduleName+' = factory(root); } }(this, function(root) {return '+obj.text+' ; }));'

}

function wrap(moduleName) {
    var stream = through.obj(function(file, enc, cb) {
        //解析路径
        var pathObj = parsePath(file.relative);

        //取文件名为模块名
        //先过滤掉.,在将-变为驼峰式
        moduleName = camelize(pathObj.basename.replace(/\./g,""));

        if (file.isBuffer()) {

            file.contents  = new Buffer(template(file.contents.toString(),moduleName));

        }else if (file.isStream()) {            
            var streamer = toStream(template(file.contents.toString(),moduleName));

            file.contents = streamer;
        }

        //改变路径
        file.path = Path.join(file.base,pathObj.dirname, pathObj.basename + ".js");

        this.push(file);
        cb();
    });

    return stream;
};
module.exports = wrap;