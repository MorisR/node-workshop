let fs = require('fs');
let querystring = require('querystring');


const homeHandler = (request, response) => {
    response.writeHead(200, {"Content-Type": "text/html"});

    fs.readFile(__dirname + '/../public/index.html', (error, file) => {
        if (error)
            serverErrorResponse(response);

        response.end(file);
    });

};
const fileHandler = (request, response) => {
    let endpoint = request.url;
    console.log(__dirname + "//..//public" + endpoint)
    fs.readFile(__dirname + "//..//public" + endpoint, (error, file) => {
        if (error)
            serverErrorResponse(response);

        let fileType = endpoint.split(".")[1];
        let types = {
            css: "text/css",
            html: "text/html",
            js: "application/javascript",
            ico: "img/x-icon",
            jpg: "image/jpg",
            png: "image/png"

        };

        response.writeHead(200, {"Content-Type": types[fileType]});
        response.end(file);
    });
};
const notFoundHandler = (request, response) => {

    response.writeHead(404, {"Content-Type": "text"});
    response.end("<h1>page not found</h1>");
};


const getPostsHandler = (request, response) => {
    fs.readFile(__dirname + "/posts.json", ((error, file) => {
        if (error)
            serverErrorResponse(response);

        response.writeHead(200, "success");
        response.end(file);

    }))
};
const submitHandler = (request, response) => {
    let allTheData = '';


    request.on('data', (chunkOfData) => {

        allTheData += chunkOfData;
    });

    request.on('end', () => {
        let convertData = querystring.parse(allTheData);
        if (convertData.post.trim() !== "")
            addPost(convertData.post);
        response.writeHead(302, {"location": "/"});
        response.end();

    });

};

function addPost(str) {
    let time = new Date().getTime();

    fs.readFile(__dirname + "/posts.json", ((error, file) => {
        if (error)
            throw "json file not found";

        let postsJson = JSON.parse(file);
        postsJson[time] = str;
        fs.writeFile(__dirname + "/posts.json", JSON.stringify(postsJson), (e) => console.error(e));

    }))


}


function serverErrorResponse(response) {
    response.writeHead(500, {"Content-Type": "text"});
    response.end("<h1>input error</h1>");
}

module.exports = {homeHandler, fileHandler, submitHandler, notFoundHandler, getPostsHandler};