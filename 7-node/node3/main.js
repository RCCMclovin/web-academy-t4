import fs from "fs/promises"
import http from "http"
import dotenv from "dotenv"

function hasFile(name, files) {
    let flag = false;
    files.forEach(element => {
        if (element.name == name) {
            flag = true;
        }
    });
    return flag;
}

dotenv.config({ path: `env/.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT ?? 3333

var dir = "./public/";
var files = [];
(async () => {
    files =  await fs.readdir(dir, { withFileTypes: true })
})();



const server = http.createServer(async (req, res) => {
    switch (req.url) {
        case "/css/style.css":
            res.writeHead(200, { "Content-Type": "text/css;charset=utf-8" });
            let css = await fs.readFile("./css/style.css", { encoding: 'utf8', flag: 'r' });
            res.end(css);
            break;
        case "/js/index.js":
            res.writeHead(200, { "Content-Type": "text/javascript;charset=utf-8" });
            let js = await fs.readFile("./js/index.js", { encoding: 'utf8', flag: 'r' });
            res.end(js);
            break;
        case "/":
            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
            let html = await fs.readFile("./index.html", { encoding: 'utf8', flag: 'r' });
            res.end(html);
            break;
        default:
            if (hasFile(req.url.substring(1), files)) {
                res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
                let txt = await fs.readFile(dir + req.url.substring(1), { encoding: 'utf8', flag: 'r' });
                res.write(txt);
                res.end();
            }
            break;
    }    
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});