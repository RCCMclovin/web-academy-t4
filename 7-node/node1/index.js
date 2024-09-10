const fs = require("fs");
const http = require("http");
const util = require("./utils/util.js")
const dotenv = require("dotenv");


dotenv.config({ path: `env/.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT ?? 3333

var dir = process.argv[2];
if (!dir.startsWith("./")){
    dir = "./" + dir;
}
else if (dir.startsWith("/")) {
    dir = "." + dir;
}
if (!dir.endsWith("/")) {
    dir += dir+"/";
}
//console.log(dir);

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    if (req.url === "/" || req.url === "/favicon.ico") {
        fs.readdir(dir, { withFileTypes: true }, (err, files) => {
            if (err)
                console.log(err);
            else {
                files.forEach(file => {
                    let str = util.createLink(dir, file.name);
                    res.write(str);
                })
                res.end();
            }
        })
    } else {
        res.write(`<a href="/">Voltar</a><br>`);
        res.write(fs.readFileSync("."+req.url, { encoding: 'utf8', flag: 'r' }));
        res.end();
    }
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
