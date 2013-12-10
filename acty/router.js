function route(handlers,pathname,response,request){
  console.log("About to route a request for " + pathname);
   if(typeof handlers[pathname] === "function"){
   	 handlers[pathname](response,request);
   }else{
   	   //console.log("404 page not find!");
   	   response.writeHead(404,{"Content-Type":"text/html"});
       response.write("404 page not find!");
       response.end();  
   }

}


exports.route = route;