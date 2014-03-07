var http = require("http"),
  url = require("url"),
  qs = require("querystring");
var port = 10007;



function start(route, handlers) {
  function onReciver(request, response) {
    var _url = request.url;
    var pathname = url.parse(_url).pathname;
    route(handlers, pathname, response,request);

  }
  http.createServer(onReciver).listen(port);
  console.log("server has start");
}


exports.start = start;