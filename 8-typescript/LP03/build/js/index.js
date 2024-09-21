"use strict";
class Produto {
    constructor(modelo, fabricante, valor, tipo) {
        this._modelo = modelo;
        this._fabricante = fabricante;
        this._valor = valor;
        this._tipo = tipo;
    }
    set modelo(modelo) {
        this._modelo = modelo;
    }
    get modelo() {
        return this._modelo;
    }
    set fabricante(fabricante) {
        this._fabricante = fabricante;
    }
    get fabricante() {
        return this._fabricante;
    }
    set valor(valor) {
        this._valor = valor;
    }
    get valor() {
        return this._valor;
    }
    get tipo() {
        return this._tipo;
    }
}
class TV extends Produto {
    constructor(modelo, fabricante, valor, resolucao, tamanho, tipo) {
        super(modelo, fabricante, valor, tipo);
        this._resolucao = resolucao;
        this._tamanho = tamanho;
    }
    set resolucao(resolucao) {
        this._resolucao = resolucao;
    }
    get resolucao() {
        return this._resolucao;
    }
    set tamanho(tamanho) {
        this._tamanho = tamanho;
    }
    get tamanho() {
        return this._tamanho;
    }
}
class Celular extends Produto {
    constructor(modelo, fabricante, valor, memoria, tipo) {
        super(modelo, fabricante, valor, tipo);
        this._memoria = memoria;
    }
    set memoria(memoria) {
        this._memoria = memoria;
    }
    get memoria() {
        return this._memoria;
    }
}
class Bicicleta extends Produto {
    constructor(modelo, fabricante, valor, aro, tipo) {
        super(modelo, fabricante, valor, tipo);
        this._aro = aro;
    }
    set aro(aro) {
        this._aro = aro;
    }
    get aro() {
        return this._aro;
    }
}
class Carrinho {
    constructor() {
        this._produtos = [];
    }
    get produtos() {
        return this._produtos;
    }
    add(produto) {
        let flag = false;
        this._produtos.forEach((item) => {
            if (!flag && JSON.stringify(item[0]) === JSON.stringify(produto)) {
                item[1]++;
                flag = true;
            }
        });
        if (!flag) {
            this._produtos.push([produto, 1]);
        }
    }
    subtract(produto) {
        let flag = true;
        this._produtos.forEach((item) => {
            if (flag && JSON.stringify(item[0]) === JSON.stringify(produto)) {
                item[1]--;
                flag = false;
            }
            if (item[1] === 0)
                this.remove(item[0]);
        });
    }
    remove(produto) {
        this._produtos = this._produtos.filter((item) => JSON.stringify(item[0]) !== JSON.stringify(produto));
    }
    total() {
        let sum = 0;
        this._produtos.forEach((item) => {
            sum += item[0].valor * item[1];
        });
        return sum;
    }
    quantidade() {
        let sum = 0;
        this._produtos.forEach((item) => {
            sum += item[1];
        });
        return sum;
    }
    clean() {
        this._produtos = [];
    }
    readBackup(backUp) {
        backUp._produtos.forEach((item) => {
            for (let i = 0; i < item[1]; i++) {
                if (item[0]._tipo === "TV") {
                    let newTv = item[0];
                    newTv = new TV(newTv._modelo, newTv._fabricante, newTv._valor, newTv._resolucao, newTv._tamanho, newTv._tipo);
                    this.add(newTv);
                }
                if (item[0]._tipo === "Bicicleta") {
                    let newBike = item[0];
                    newBike = new Bicicleta(newBike._modelo, newBike._fabricante, newBike._valor, newBike._aro, newBike._tipo);
                    this.add(newBike);
                }
                if (item[0]._tipo === "Celular") {
                    let newCel = item[0];
                    newCel = new Celular(newCel._modelo, newCel._fabricante, newCel._valor, newCel._memoria, newCel._tipo);
                    this.add(newCel);
                }
            }
        });
    }
}
function killChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
function setLine(tupla, tbody, carrinho) {
    let tr = document.createElement("tr");
    let td = document.createElement("th");
    let scope = document.createAttribute("scope");
    let text = document.createTextNode(tupla[0].tipo);
    scope.value = "row";
    td.setAttributeNode(scope);
    td.appendChild(text);
    tr.appendChild(td);
    td = document.createElement("td");
    text = document.createTextNode(tupla[0].modelo);
    td.appendChild(text);
    tr.appendChild(td);
    td = document.createElement("td");
    text = document.createTextNode(tupla[0].fabricante);
    td.appendChild(text);
    tr.appendChild(td);
    td = document.createElement("td");
    text = document.createTextNode(tupla[0].valor.toString());
    td.appendChild(text);
    tr.appendChild(td);
    td = document.createElement("td");
    td.classList.add("d-flex");
    td.classList.add("justify-content-evenly");
    td.classList.add("align-items-center");
    let subBut = document.createElement("button");
    text = document.createTextNode("-");
    subBut.appendChild(text);
    subBut.classList.add("btn");
    subBut.classList.add("btn-primary");
    subBut.classList.add("px-1");
    subBut.classList.add("ml-auto");
    td.appendChild(subBut);
    let quantSpace = document.createElement("div");
    quantSpace.style.textAlign = "center";
    quantSpace.classList.add("d-inline");
    text = document.createTextNode(tupla[1].toString());
    quantSpace.appendChild(text);
    quantSpace.classList.add("ml-auto");
    td.appendChild(quantSpace);
    let addBut = document.createElement("button");
    text = document.createTextNode("+");
    addBut.appendChild(text);
    addBut.classList.add("btn");
    addBut.classList.add("btn-primary");
    addBut.classList.add("px-1");
    addBut.classList.add("ml-auto");
    td.appendChild(addBut);
    let rmBut = document.createElement("button");
    text = document.createTextNode("Remover");
    rmBut.appendChild(text);
    rmBut.classList.add("btn");
    rmBut.classList.add("btn-warning");
    rmBut.classList.add("ml-auto");
    td.appendChild(rmBut);
    tr.appendChild(td);
    tbody.appendChild(tr);
    subBut.addEventListener("click", (event) => {
        carrinho.subtract(tupla[0]);
        localStorage.setItem("Carrinho", JSON.stringify(carrinho));
        updatePage();
    });
    addBut.addEventListener("click", (event) => {
        carrinho.add(tupla[0]);
        localStorage.setItem("Carrinho", JSON.stringify(carrinho));
        updatePage();
    });
    rmBut.addEventListener("click", (event) => {
        carrinho.remove(tupla[0]);
        localStorage.setItem("Carrinho", JSON.stringify(carrinho));
        updatePage();
    });
}
function setLines(carrinho) {
    let tbody = document.getElementById("tbody");
    killChildren(tbody);
    carrinho.produtos.forEach((item) => setLine(item, tbody, carrinho));
}
function updatePage() {
    let carrinho = new Carrinho();
    if (localStorage.getItem("Carrinho")) {
        carrinho.readBackup(JSON.parse(localStorage.getItem("Carrinho")));
    }
    let text;
    let numProd = document.getElementById("numProd");
    killChildren(numProd);
    text = document.createTextNode(carrinho.quantidade().toString());
    numProd.appendChild(text);
    let valProd = document.getElementById("valProd");
    killChildren(valProd);
    text = document.createTextNode(carrinho.total().toString());
    valProd.appendChild(text);
    setLines(carrinho);
}
function updateForm(type) {
    let fields = document.getElementById("fields");
    let div = document.createElement("div");
    let text;
    let label = document.createElement("label");
    let att = document.createAttribute("for");
    let inputE = document.createElement("input");
    let feed = document.createElement("div");
    killChildren(fields);
    switch (type) {
        case "TV":
            text = document.createTextNode("Resolução");
            div.classList.add("d-block");
            label.classList.add("form-label");
            att.value = "Res";
            label.setAttributeNode(att);
            label.appendChild(text);
            div.appendChild(label);
            inputE.classList.add("form-control");
            att = document.createAttribute("type");
            att.value = "text";
            inputE.setAttributeNode(att);
            inputE.id = "Res";
            att = document.createAttribute("value");
            att.value = "";
            inputE.setAttributeNode(att);
            att = document.createAttribute("required");
            inputE.setAttributeNode(att);
            div.appendChild(inputE);
            feed.classList.add("invalid-feedback");
            text = document.createTextNode("Preencha este campo.");
            feed.appendChild(text);
            div.appendChild(feed);
            fields.appendChild(div);
            div = document.createElement("div");
            text = document.createTextNode("Tamanho em Polegadas");
            label = document.createElement("label");
            att = document.createAttribute("for");
            inputE = document.createElement("input");
            feed = document.createElement("div");
            div.classList.add("d-block");
            label.classList.add("form-label");
            att.value = "Tam";
            label.setAttributeNode(att);
            label.appendChild(text);
            div.appendChild(label);
            inputE.classList.add("form-control");
            att = document.createAttribute("type");
            att.value = "number";
            inputE.setAttributeNode(att);
            inputE.id = "Tam";
            att = document.createAttribute("value");
            att.value = "";
            inputE.setAttributeNode(att);
            att = document.createAttribute("required");
            inputE.setAttributeNode(att);
            div.appendChild(inputE);
            feed.classList.add("invalid-feedback");
            text = document.createTextNode("Preencha este campo.");
            feed.appendChild(text);
            div.appendChild(feed);
            fields.appendChild(div);
            break;
        case "Celular":
            text = document.createTextNode("Memória");
            div.classList.add("d-block");
            label.classList.add("form-label");
            att.value = "Mem";
            label.setAttributeNode(att);
            label.appendChild(text);
            div.appendChild(label);
            inputE.classList.add("form-control");
            att = document.createAttribute("type");
            att.value = "text";
            inputE.setAttributeNode(att);
            inputE.id = "Mem";
            att = document.createAttribute("value");
            att.value = "";
            inputE.setAttributeNode(att);
            att = document.createAttribute("required");
            inputE.setAttributeNode(att);
            div.appendChild(inputE);
            feed.classList.add("invalid-feedback");
            text = document.createTextNode("Preencha este campo.");
            feed.appendChild(text);
            div.appendChild(feed);
            fields.appendChild(div);
            break;
        case "Bicicleta":
            text = document.createTextNode("Tamanho do Aro");
            div.classList.add("d-block");
            label.classList.add("form-label");
            att.value = "Aro";
            label.setAttributeNode(att);
            label.appendChild(text);
            div.appendChild(label);
            inputE.classList.add("form-control");
            att = document.createAttribute("type");
            att.value = "text";
            inputE.setAttributeNode(att);
            inputE.id = "Aro";
            att = document.createAttribute("value");
            att.value = "";
            inputE.setAttributeNode(att);
            att = document.createAttribute("required");
            inputE.setAttributeNode(att);
            div.appendChild(inputE);
            feed.classList.add("invalid-feedback");
            text = document.createTextNode("Preencha este campo.");
            feed.appendChild(text);
            div.appendChild(feed);
            fields.appendChild(div);
            break;
    }
}
function getType(radioTV, radioBike, radioCel) {
    if (radioTV.checked)
        return radioTV.value;
    if (radioBike.checked)
        return radioBike.value;
    if (radioCel.checked)
        return radioCel.value;
    return "";
}
window.onload = () => {
    let formCreate = document.getElementById("formCreateProduto");
    let radioTV = document.getElementById("TV");
    let radioBike = document.getElementById("bicicleta");
    let radioCel = document.getElementById("celular");
    let prodSelec = document.getElementById("prodSelec");
    let cleanCart = document.getElementById("butCleanCart");
    let buy = document.getElementById("butBuy");
    let newType = "";
    prodSelec.addEventListener("click", (event) => {
        let type = getType(radioTV, radioBike, radioCel);
        if (type && newType !== type) {
            updateForm(type);
            newType = type;
        }
    });
    formCreate.addEventListener("submit", (event) => {
        let carrinho = new Carrinho();
        if (localStorage.getItem("Carrinho")) {
            carrinho.readBackup(JSON.parse(localStorage.getItem("Carrinho")));
        }
        let Modelo = document.getElementById("Modelo");
        let Fabricante = document.getElementById("Fabricante");
        let Valor = document.getElementById("Valor");
        if (formCreate.checkValidity() && newType) {
            if (newType === "TV") {
                let Res = document.getElementById("Res");
                let Tam = document.getElementById("Tam");
                carrinho.add(new TV(Modelo.value, Fabricante.value, parseFloat(Valor.value), Res.value, parseFloat(Tam.value), newType));
                localStorage.setItem("Carrinho", JSON.stringify(carrinho));
            }
            if (newType === "Bicicleta") {
                let Aro = document.getElementById("Aro");
                carrinho.add(new Bicicleta(Modelo.value, Fabricante.value, parseFloat(Valor.value), parseFloat(Aro.value), newType));
                localStorage.setItem("Carrinho", JSON.stringify(carrinho));
            }
            if (newType === "Celular") {
                let Mem = document.getElementById("Mem");
                carrinho.add(new Celular(Modelo.value, Fabricante.value, parseFloat(Valor.value), parseFloat(Mem.value), newType));
                localStorage.setItem("Carrinho", JSON.stringify(carrinho));
            }
            updatePage();
        }
    });
    cleanCart.addEventListener("click", (event) => {
        let carrinho = new Carrinho();
        if (localStorage.getItem("Carrinho")) {
            carrinho.readBackup(JSON.parse(localStorage.getItem("Carrinho")));
        }
        carrinho.clean();
        localStorage.setItem("Carrinho", JSON.stringify(carrinho));
        updatePage();
    });
    buy.addEventListener("click", (event) => {
        let carrinho = new Carrinho();
        if (localStorage.getItem("Carrinho")) {
            carrinho.readBackup(JSON.parse(localStorage.getItem("Carrinho")));
        }
        carrinho.clean();
        localStorage.setItem("Carrinho", JSON.stringify(carrinho));
        window.alert("Você comprou!");
        updatePage();
    });
    updatePage();
};
