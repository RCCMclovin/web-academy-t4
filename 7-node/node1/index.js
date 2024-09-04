const fs = require("fs");
const http = require("http");

const dir = process.argv[2];

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                let str = file.name + "<br>";
                res.write(str);
            })
            res.end();
        }
    
    })

    
})

server.listen(3333);
