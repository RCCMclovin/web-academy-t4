class ListItem{
    name: string;
    time_inserted: string;
    time_limit: string; 
    description: string;
    done: boolean;
    enabled: boolean = true;

    constructor(name: string, time_inserted: string, time_limit: string, description: string) {
        this.name = name;
        this.time_inserted = time_inserted;
        this.time_limit = time_limit;
        this.description = description;
        this.done = false;
    }
}


var userId: string = localStorage.getItem("curUser") ?? "";

if (!userId) {
    throw new Error("Usuário não logado, por favor faça login");
}

var cards: HTMLElement | null = document.getElementById("cards");
var itemlist: ListItem[] = JSON.parse(localStorage.getItem(userId) ?? "{[]}"); 
var createForm: HTMLFormElement = document.getElementById("createForm") as HTMLFormElement;
var nomeTarafa: HTMLInputElement = document.getElementById("nomeTarafa") as HTMLInputElement;
var tempoTarafa: HTMLInputElement = document.getElementById("tempoTarafa") as HTMLInputElement;
var descriçãoTarafa: HTMLInputElement = document.getElementById("descriçãoTarafa") as HTMLInputElement;


createForm?.addEventListener("submit", (event) => {
    event.stopPropagation();
    let limit: string = "";
    if (tempoTarafa?.value) limit = (new Date(tempoTarafa?.value)).toString()
    let newItem = new ListItem(nomeTarafa?.value, (new Date()).toString(), limit, descriçãoTarafa?.value);
    itemlist.push(newItem);
    localStorage.setItem(userId, JSON.stringify(itemlist));
    listItems(itemlist);
    console.log()
})

function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

function dateFormat(date: Date): string {
    return (
      [ date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-') +
      ' ' +
      [ padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds()) ].join(':')
    );
}

function createCard(item: ListItem): HTMLElement{
    let now: Date = new Date();
    let text: Text;
    let card: HTMLElement = document.createElement("div");
    card.classList.add("card");
    card.classList.add("p-3");
    card.classList.add("m-2");
    if (item.done) {
        card.classList.add("text-bg-success");
    } else if (now > (new Date(item.time_limit))) {
        card.classList.add("text-bg-danger");
    } else {
        card.classList.add("text-bg-primary");
    }
    let cardHeader: HTMLElement = document.createElement("div");
    cardHeader.classList.add("card-header");
    cardHeader.classList.add("d-flex");
    cardHeader.classList.add("justify-content-end");
    cardHeader.classList.add("h-3");
    let close: HTMLElement = document.createElement("a");
    let att: Attr = document.createAttribute("href");
    att.value = "list.html";
    close.classList.add("material-symbols-outlined");
    close.classList.add("text-white");
    close.setAttributeNode(att);
    text = document.createTextNode("X");
    close.appendChild(text);
    close.style.textDecoration = "none";
    cardHeader.appendChild(close);
    card.appendChild(cardHeader);

    let cardBody: HTMLElement = document.createElement("div");
    cardBody.classList.add("card-body");
    let h2: HTMLElement = document.createElement("h2");
    text = document.createTextNode(item.name);
    h2.appendChild(text);
    cardBody.appendChild(h2);
    var h6: HTMLElement = document.createElement("h6");
    text = document.createTextNode(item.description);
    h6.appendChild(text);
    cardBody.appendChild(document.createElement("br"));
    cardBody.appendChild(h6);
    if (!item.description)  {
        cardBody.appendChild(document.createElement("br"));
    }
    h6 = document.createElement("h6");
    text = document.createTextNode("Tarefa Criada em: ".concat(dateFormat(new Date(item.time_inserted))));
    h6.appendChild(text);
    cardBody.appendChild(document.createElement("br"));
    cardBody.appendChild(h6);
    if (item.time_limit) {
        h6 = document.createElement("h6");
        text = document.createTextNode("Limite: ".concat(dateFormat(new Date(item.time_limit))));
        h6.appendChild(text);
        cardBody.appendChild(document.createElement("br"));
        cardBody.appendChild(h6);
    } else {
        cardBody.appendChild(document.createElement("br"));
        cardBody.appendChild(document.createElement("br"));
    }
    card.appendChild(cardBody);

    let cardFooter: HTMLElement = document.createElement("div");
    cardFooter.classList.add("card-footer");
    cardFooter.classList.add("d-flex");
    cardFooter.classList.add("justify-content-between");
    card.appendChild(cardFooter);
    let butDone = document.createElement("button");
    butDone.classList.add("btn");
    butDone.style.width = "48%";
    butDone.classList.add("mr-1");
    if (item.done) {
        butDone.classList.add("btn-secondary");
        text = document.createTextNode("Pendente");
    } else {
        butDone.classList.add("btn-success");
        text = document.createTextNode("Terminar");
    }
    butDone.appendChild(text);
    cardFooter.appendChild(butDone);

    let butEdit = document.createElement("button");
    butEdit.classList.add("btn");
    butEdit.style.width = "50%";
    butEdit.classList.add("ml-1");
    butEdit.classList.add("btn-info");
    att = document.createAttribute("data-bs-toggle");
    att.value = "modal";
    butEdit.setAttributeNode(att);
    att = document.createAttribute("data-bs-target");
    att.value = "#editModal";
    butEdit.setAttributeNode(att);
    text = document.createTextNode("Editar");
    butEdit.appendChild(text);
    cardFooter.appendChild(butEdit);

    butDone.addEventListener("click", (event) => {
        event.stopPropagation();
        item.done = !item.done;
        listItems(itemlist);
    })
    close.addEventListener("click", (event) => {
        event.stopPropagation();
        item.enabled = false;
        listItems(itemlist);
    })
    butEdit.addEventListener("click", (event) => {
        let form: HTMLFormElement = document.getElementById("editForm") as HTMLFormElement;
        let nome: HTMLInputElement = document.getElementById("EditNomeTarafa") as HTMLInputElement;
        let timeLimit: HTMLInputElement = document.getElementById("EditTempoTarafa") as HTMLInputElement;
        let descricao: HTMLInputElement = document.getElementById("EditDescriçãoTarafa") as HTMLInputElement;
        nome.value = item.name;
        timeLimit.value = item.time_limit;
        descricao.value = item.description;

        form?.addEventListener("submit", (event) => {
            if (form.checkValidity()) {
                let limit: string = "";
                if (timeLimit.value) limit = (new Date(timeLimit.value)).toString();
                form.classList.add('was-validated');
                item.name = nome.value;
                item.time_limit = limit;
                item.description = descricao.value;
                localStorage.setItem(userId, JSON.stringify(itemlist));
                window.location.replace("list.html");
            }
        })
    })

    return card;

}

function listItems(ilist: ListItem[]) {
    ilist = ilist.filter((item) => item.enabled);
    localStorage.setItem(userId, JSON.stringify(itemlist));
    while (cards?.firstChild) {
        cards.removeChild(cards.firstChild);
    }
    ilist.forEach((item: ListItem) => {
        cards?.append(createCard(item));
    })
    
}

window.onload = () => {
    listItems(itemlist)
};