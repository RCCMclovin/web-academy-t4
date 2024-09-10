const fs = require("fs");
const http = require("http");
const dotenv = require("dotenv");


dotenv.config({ path: `env/.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT ?? 3333

const dir = process.argv[2];
console.log(dir);

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

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
