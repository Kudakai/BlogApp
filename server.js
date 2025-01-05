const http = require(`http`);
const fs = require(`fs`);

const server = http.createServer((req,res) => {
    console.log(`incoming request to ${req.url} via ${req.method} method`);
    res.setHeader('Content-Type', 'text/html');

    let path = `./views/`

    switch(req.url) {
        case `/`:
            path+= `index.html`;
            res.statusCode = 200;
            break;
        case `/about`:
            path+= `about.html`;
            res.statusCode = 200;
            break;
        case `/about-us`:
            res.statusCode = 301;
            res.setHeader(`Location`, `/about`)
            break;
        default:
            path+= `404.html`;
            res.statusCode = 404;
            break;
    };

    //sending an html file
    fs.readFile(path, (err, data) => {
       if(err){
            console.log(err);
            res.end();
       }else{
            res.end(data);
       };
    });
});

server.listen(3000, `localhost`, () => {
    console.log(`Server up and listening`);
});
