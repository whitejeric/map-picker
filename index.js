var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

if (process.env.NODE_ENV !== 'production') {
  /*  Development Settings:
  *   Here we build a hot-reloading bundle in the /static directory (notice static is
  *   not a physical directory) and reference it with our index.html in the project
  *   root.
  */
  console.log('Using dev settings...');
  console.log('Root of project, index.html, located at ' + __dirname + '/index.html');

  app.use(express.static(__dirname));

  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');

  var config = require('./webpack.config');
  var compiler = webpack(config);
  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));

  app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html')
  });
}
else{
  /*  Production Settings:
  *   Here we build a non-hot reloading bundle and reference it with the index.html
  *   located in /public. This means that when the commit is pushed to the heroku
  *   server the bundle.js and index.html core files are bundled in the same directory.
  */
  console.log('Using production settings...');
  console.log('Root of project, index.html, located at ' + __dirname + '/public/index.html');

  app.use(express.static(__dirname + '/public'));

  app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html')
  });
}

app.listen(app.get('port'), function(error) {
  if (error){
    console.log(error)
  }
  else{
    console.log(' ==> 🌎 Node app is running on port', app.get('port'));
  }
});
