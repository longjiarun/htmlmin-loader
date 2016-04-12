## Install

```javascript
npm install gulp-wraptemplate
```

## Usage
Wrap up tempalte file 

Global variables using "template_" + the file name
```javascript
var wraptemplate = require("gulp-wraptemplate");

gulp.task("wraptemplate",function(){
    return gulp.src(src+"/tpl/*.html")
        .pipe(wraptemplate())
        .pipe(gulp.dest(src+"/js/tpl"))
});

```

## Example
template file (index.html)

```html
<div class="item">
    <p><%= item.name%></p>
</div>
```

module file (index.js)
```javacript
!(function(root, factory) {
    if (typeof module !== "undefined" && module.exports) {
        module.exports = factory(root);
    } else if (typeof define === "function") {
        define(function() {
            return factory(root);
        });
    } else {
        root.template_index = factory(root);
    }
}(this, function(root) {
    return "<div class=\"item\">\n    <p><%= item.name%></p>\n</div>";
}));

```
## LICENSE
MIT