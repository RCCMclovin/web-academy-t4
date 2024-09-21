class Produto{
    private _modelo: string;
    private _fabricante: string;
    private _valor: number;
    private _tipo: string;

    constructor(modelo: string, fabricante: string, valor: number, tipo: string) {
        this._modelo = modelo;
        this._fabricante = fabricante;
        this._valor = valor;
        this._tipo = tipo;
    }

    set modelo(modelo: string) {
        this._modelo = modelo;
    }
    get modelo() {
        return this._modelo;
    }
    set fabricante(fabricante: string) {
        this._fabricante = fabricante;
    }
    get fabricante() {
        return this._fabricante;
    }
    set valor(valor: number) {
        this._valor = valor;
    }
    get valor() {
        return this._valor;
    }
    get tipo() {
        return this._tipo;
    }
}

class TV extends Produto{
    private _resolucao: string;
    private _tamanho: number;

    constructor(modelo: string, fabricante: string, valor: number, resolucao: string, tamanho: number, tipo: string) {
        super(modelo, fabricante, valor, tipo);
        this._resolucao = resolucao;
        this._tamanho = tamanho;
    }

    set resolucao(resolucao: string) {
        this._resolucao = resolucao;
    }
    get resolucao() {
        return this._resolucao;
    }
    set tamanho(tamanho: number) {
        this._tamanho = tamanho;
    }
    get tamanho() {
        return this._tamanho;
    }
}

class Celular extends Produto{
    private _memoria: number;

    constructor(modelo: string, fabricante: string, valor: number, memoria: number, tipo: string) {
        super(modelo, fabricante, valor, tipo);
        this._memoria = memoria;
    }

    set memoria(memoria: number) {
        this._memoria = memoria;
    }
    get memoria() {
        return this._memoria;
    }
}

class Bicicleta extends Produto{
    private _aro: number;

    constructor(modelo: string, fabricante: string, valor: number, aro: number, tipo: string) {
        super(modelo, fabricante, valor, tipo);
        this._aro = aro;
    }

    set aro(aro: number) {
        this._aro = aro;
    }
    get aro() {
        return this._aro;
    }

}

class Carrinho <T extends Produto>{
    private _produtos: [T, number][];

    constructor () {
        this._produtos = [];
    }

    get produtos() {
        return this._produtos;
    }
    public add(produto: T) {
        let flag: boolean = false;
        this._produtos.forEach((item) => {
            if (!flag && JSON.stringify(item[0]) === JSON.stringify(produto)) {
                item[1]++;
                flag = true;
            }
        })
        if (!flag) {
            this._produtos.push([produto,1]); 
        }
    }
    public subtract(produto: T) {
        let flag: boolean = true;
        this._produtos.forEach((item) => {
            if (flag && JSON.stringify(item[0]) === JSON.stringify(produto)) {
                item[1]--;
                flag = false;
            }
            if (item[1] === 0) this.remove(item[0]);
        })
    }
    public remove(produto: T) {
        this._produtos = this._produtos.filter((item) => JSON.stringify(item[0]) !== JSON.stringify(produto));
    }
    public total(): number{
        let sum: number = 0;
        this._produtos.forEach((item) => {
            sum += item[0].valor * item[1];
        })
        return sum
    }
    public quantidade(): number{
        let sum: number = 0;
        this._produtos.forEach((item) => {
            sum += item[1];
        })
        return sum;
    }
    public clean() {
        this._produtos = [];
    }
    public readBackup<T2 extends { _produtos: [T, number][] }>(backUp: T2) {
        backUp._produtos.forEach((item) => {
            for (let i = 0; i < item[1]; i++){
                if ((item[0] as any)._tipo === "TV") {
                    let newTv: TV|any = (item[0] as any);
                    newTv = new TV(newTv._modelo, newTv._fabricante, newTv._valor,
                        newTv._resolucao, newTv._tamanho, newTv._tipo)
                    this.add((newTv as unknown) as T);
                }
                if ((item[0] as any)._tipo === "Bicicleta") {
                    let newBike: Bicicleta|any = (item[0] as any);
                    newBike = new Bicicleta(newBike._modelo, newBike._fabricante, newBike._valor,
                        newBike._aro, newBike._tipo)
                    this.add((newBike as unknown) as T);
                }
                if ((item[0] as any)._tipo === "Celular") {
                    let newCel: Celular|any = (item[0] as any) ;
                    newCel = new Celular(newCel._modelo, newCel._fabricante, newCel._valor,
                        newCel._memoria, newCel._tipo)
                    this.add((newCel as unknown) as T);
                }
            }
        })
    }
}

function killChildren(element: HTMLElement) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function setLine<T extends Produto>(tupla: [T, number], tbody: HTMLElement, carrinho: Carrinho<Produto>) {
    let tr: HTMLElement = document.createElement("tr");
    let td: HTMLElement = document.createElement("th");
    let scope: Attr = document.createAttribute("scope");
    let text: Text = document.createTextNode(tupla[0].tipo);
    scope.value = "row";
    td.setAttributeNode(scope);
    td.appendChild(text);
    tr.appendChild(td);

    td = document.createElement("td")
    text = document.createTextNode(tupla[0].modelo);
    td.appendChild(text);
    tr.appendChild(td);

    td = document.createElement("td")
    text = document.createTextNode(tupla[0].fabricante);
    td.appendChild(text);
    tr.appendChild(td);

    td = document.createElement("td")
    text = document.createTextNode(tupla[0].valor.toString());
    td.appendChild(text);
    tr.appendChild(td);

    td = document.createElement("td");
    td.classList.add("d-flex");
    td.classList.add("justify-content-evenly");
    td.classList.add("align-items-center");
    let subBut: HTMLElement = document.createElement("button");
    text = document.createTextNode("-");
    subBut.appendChild(text);
    subBut.classList.add("btn");
    subBut.classList.add("btn-primary");
    subBut.classList.add("px-1");
    subBut.classList.add("ml-auto");
    td.appendChild(subBut);
    let quantSpace: HTMLElement = document.createElement("div");
    quantSpace.style.textAlign = "center";
    quantSpace.classList.add("d-inline");
    text = document.createTextNode(tupla[1].toString());
    quantSpace.appendChild(text);
    quantSpace.classList.add("ml-auto");
    td.appendChild(quantSpace);
    let addBut: HTMLElement = document.createElement("button");
    text = document.createTextNode("+");
    addBut.appendChild(text);
    addBut.classList.add("btn");
    addBut.classList.add("btn-primary");
    addBut.classList.add("px-1");
    addBut.classList.add("ml-auto");
    td.appendChild(addBut);
    let rmBut: HTMLElement = document.createElement("button");
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
    })
    addBut.addEventListener("click", (event) => {
        carrinho.add(tupla[0]);
        localStorage.setItem("Carrinho", JSON.stringify(carrinho));
        updatePage();
    })
    rmBut.addEventListener("click", (event) => {
        carrinho.remove(tupla[0]);
        localStorage.setItem("Carrinho", JSON.stringify(carrinho));
        updatePage();
    })
}

function setLines(carrinho: Carrinho<Produto>) {
    let tbody: HTMLElement = document.getElementById("tbody") as HTMLElement;
    killChildren(tbody);
    carrinho.produtos.forEach((item) => setLine(item, tbody, carrinho));
}

function updatePage() {
    let carrinho: Carrinho<Produto> = new Carrinho();
    if (localStorage.getItem("Carrinho")) {
        carrinho.readBackup(JSON.parse(localStorage.getItem("Carrinho") as string));
    }

    let text: Text;
    let numProd: HTMLElement = document.getElementById("numProd") as HTMLElement;
    killChildren(numProd);
    text = document.createTextNode(carrinho.quantidade().toString());
    numProd.appendChild(text);

    let valProd: HTMLElement = document.getElementById("valProd") as HTMLElement;
    killChildren(valProd);
    text = document.createTextNode(carrinho.total().toString());
    valProd.appendChild(text);

    setLines(carrinho);
}

function updateForm(type: string) {
    let fields: HTMLElement = document.getElementById("fields") as HTMLElement;
    let div: HTMLElement = document.createElement("div");
    let text: Text;
    let label: HTMLElement = document.createElement("label");
    let att: Attr = document.createAttribute("for");
    let inputE: HTMLInputElement = document.createElement("input") as HTMLInputElement;
    let feed: HTMLElement = document.createElement("div");
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
            inputE.id = "Res"
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
            inputE = document.createElement("input") as HTMLInputElement;
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
            inputE.id = "Tam"
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
            inputE.id = "Mem"
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
            inputE.id = "Aro"
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

function getType(radioTV: HTMLInputElement, radioBike: HTMLInputElement, radioCel: HTMLInputElement): string{
    if (radioTV.checked) return radioTV.value;
    if (radioBike.checked) return radioBike.value;
    if (radioCel.checked) return radioCel.value;

    return "";
}

window.onload = () => {
    let formCreate: HTMLFormElement = document.getElementById("formCreateProduto") as HTMLFormElement;
    let radioTV: HTMLInputElement = document.getElementById("TV") as HTMLInputElement;
    let radioBike: HTMLInputElement = document.getElementById("bicicleta") as HTMLInputElement;
    let radioCel: HTMLInputElement = document.getElementById("celular") as HTMLInputElement;
    let prodSelec: HTMLElement = document.getElementById("prodSelec") as HTMLElement;
    let cleanCart: HTMLElement = document.getElementById("butCleanCart") as HTMLElement;
    let buy: HTMLElement = document.getElementById("butBuy") as HTMLElement;
    let newType: string = "";

    prodSelec.addEventListener("click", (event) => {
        let type: string = getType(radioTV, radioBike, radioCel);
        if (type && newType !== type) {
            updateForm(type);
            newType = type;
        }
        
    })

    formCreate.addEventListener("submit", (event) => {
        let carrinho: Carrinho<Produto> = new Carrinho();
        if (localStorage.getItem("Carrinho")) {
            carrinho.readBackup(JSON.parse(localStorage.getItem("Carrinho") as string));
        }

        let Modelo: HTMLInputElement = document.getElementById("Modelo") as HTMLInputElement;
        let Fabricante: HTMLInputElement = document.getElementById("Fabricante") as HTMLInputElement;
        let Valor: HTMLInputElement = document.getElementById("Valor") as HTMLInputElement;
        if (formCreate.checkValidity() && newType) {
            if (newType === "TV") {
                let Res: HTMLInputElement = document.getElementById("Res") as HTMLInputElement;
                let Tam: HTMLInputElement = document.getElementById("Tam") as HTMLInputElement;
                carrinho.add(new TV(Modelo.value, Fabricante.value, parseFloat(Valor.value),
                    Res.value, parseFloat(Tam.value), newType));
                localStorage.setItem("Carrinho", JSON.stringify(carrinho));
            }
            if (newType === "Bicicleta") {
                let Aro: HTMLInputElement = document.getElementById("Aro") as HTMLInputElement;
                carrinho.add(new Bicicleta(Modelo.value, Fabricante.value, parseFloat(Valor.value),
                    parseFloat(Aro.value), newType));
                localStorage.setItem("Carrinho", JSON.stringify(carrinho));
            }
            if (newType === "Celular") {
                let Mem: HTMLInputElement = document.getElementById("Mem") as HTMLInputElement;
                carrinho.add(new Celular(Modelo.value, Fabricante.value, parseFloat(Valor.value),
                    parseFloat(Mem.value), newType));
                localStorage.setItem("Carrinho", JSON.stringify(carrinho));
            }
            updatePage();
        }
    })

    cleanCart.addEventListener("click", (event) => {
        let carrinho: Carrinho<Produto> = new Carrinho();
        if (localStorage.getItem("Carrinho")) {
            carrinho.readBackup(JSON.parse(localStorage.getItem("Carrinho") as string));
        }
        carrinho.clean();
        localStorage.setItem("Carrinho", JSON.stringify(carrinho));
        updatePage();
    })

    buy.addEventListener("click", (event) => {
        let carrinho: Carrinho<Produto> = new Carrinho();
        if (localStorage.getItem("Carrinho")) {
            carrinho.readBackup(JSON.parse(localStorage.getItem("Carrinho") as string));
        }
        carrinho.clean();
        localStorage.setItem("Carrinho", JSON.stringify(carrinho));
        window.alert("Você comprou!");
        updatePage();
    })
    updatePage();
}


