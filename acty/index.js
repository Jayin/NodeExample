var server = require("./server"),
	router = require("./router"),
	requestHandlers = require("./requestHandlers");

function initServer(){
    var handler = {};
    handler["/"] = requestHandlers.start;
    handler["/start"] = requestHandlers.start;
    handler["/upload"] = requestHandlers.upload;
    handler["/show"] = requestHandlers.show;
    handler["/fetch"] =requestHandlers.fetch;

    server.start(router.route,handler);
}
initServer(11);


