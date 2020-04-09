
let handlers = require("./handlers");


function router(request, response){
    let endpoint = request.url;

    if (endpoint === "/")
        handlers.homeHandler(request,response);


    else if( endpoint.split(".").length === 2)
        handlers.fileHandler(request,response);


    else if(endpoint === "/create/post" && request.method === "POST")
        handlers.submitHandler(request,response);


    else if(endpoint === "/posts" && request.method === "GET")
        handlers.getPostsHandler(request,response);


    else handlers.notFoundHandler(request,response);


}

module.exports= router;
