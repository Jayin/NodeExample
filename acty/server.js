var http = require("http"),
  url = require("url"),
  qs = require("querystring");
var port = 10007;



function start(route, handlers) {
  function onReciver(request, response) {
    var _url = request.url;
    var pathname = url.parse(_url).pathname;
    var postData = "";

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
           postData+=postDataChunk;
            console.log("Received POST data chunk '"+ 
              postDataChunk + "'.");
    });

     request.addListener("end", function() {
         route(handlers, pathname, response,postData);
    });

  
   
 

  }
  http.createServer(onReciver).listen(port);
  console.log("server has start");
}


exports.start = start;