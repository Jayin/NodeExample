var querystring = require("querystring");

function start(response,postData){
	  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end();
}

function upload(response,postData){
	console.log("upload!");
	response.writeHead(200,{"Content-Type":"text/html"});
	 var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    querystring.parse(postData).text+
    '</body>'+
    '</html>';
	response.write(body);
	response.end();
}

exports.start = start;
exports.upload = upload;