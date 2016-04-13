## Install

```javascript
npm install htmlmin-loader --save
```

## Usage
Documentation: Using loaders[http://webpack.github.io/docs/using-loaders.html]

options see html-minifier[https://github.com/kangax/html-minifier].

```javascript
    //config

    module: {
        loaders: [{
            test: /\.html$/,
            loader: "htmlmin-loader"
        }]
    },
    'htmlmin-loader': {
        /*[options]*/
    }
```

## LICENSE
MIT [http://www.opensource.org/licenses/mit-license.php]