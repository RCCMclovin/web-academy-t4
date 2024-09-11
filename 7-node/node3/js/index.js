var lorem = [];
const paragrafo = document.getElementById("lorem");
const num = document.getElementById("num");
const butt = document.getElementById("gerar");

butt.addEventListener("click", async (e) => {
    e.stopPropagation();
    while (paragrafo.firstChild) {
        paragrafo.removeChild(paragrafo.lastChild);
    }
    let val = parseInt(num.value);
    while (val > 0) {
        if (!lorem[val % 10]) {
            lorem[val % 10] = await ((await fetch(`lorem${val % 10}.txt`)).text())
        }
        let str = lorem[val % 10];
        let text = document.createTextNode(str);
        paragrafo.appendChild(text);
        paragrafo.appendChild(document.createElement("br"));
        paragrafo.appendChild(document.createElement("br"));
        val--;
    }
    
})