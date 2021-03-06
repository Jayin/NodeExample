var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable"),
    util = require("util"),
url = require("url");

var iconv = require('iconv-lite');
var request = require('request');

function start(response, request) {
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' +
        'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("upload!");
    var form = formidable.IncomingForm();
    console.log("about to parese");
    form.parse(request, function (err, fieds, files) {
        console.log("parse done");
        console.log(files);
        var readStream = fs.createReadStream(files.upload.path);

        var writeStream = fs.createWriteStream("./tmp/test.png");

        util.pump(readStream, writeStream, function () {

            fs.unlinkSync(files.upload.path);

        });
        //  fs.renameSync(files.upload.path, "./tmp/test.png");
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();

    });

}

function show(response, request) {
    console.log("Request handler 'show' was called.");
    fs.readFile("./tmp/test.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {
                "Content-Type": "text/plain"
            });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {
                "Content-Type": "image/png"
            });
            response.write(file, "binary");
            response.end();
        }
    });
}
/**
 * querystring.parse('foo=bar&baz=qux&baz=quux&corge')
 // returns
 { foo: 'bar', baz: ['qux', 'quux'], corge: '' }
 */
function getQueryString(req) {
    return querystring.parse(url.parse(req.url).query);
}

function fetch(response, req) {
    var baseURL = 'http://www.';

    _endtity = getQueryString(req);

    if (!_endtity.req) {
        baseURL = 'http://www.wyu.cn/news/default.asp?page=1';
    } else {
        baseURL = baseURL + _endtity.req; //req get the URL that you want to fetch
    }

    request(baseURL, function (error, res, body) {
        if (!error && res.statusCode == 200) {

            response.writeHead(200, {"Content-Type": "text/html"});
            if(iconv.encodingExists("gb2312")){
                    var newBody =iconv.decode(body,'gb2312');

                  console.log(_newBodyBuffer.toString());
                  response.write(_newBodyBuffer.toString());

            }else{
                response.write("not support this !");
            }
            response.end();
        }
    })
}
exports.start = start;
exports.upload = upload;
exports.show = show;
exports.fetch = fetch;