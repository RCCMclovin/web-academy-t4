var _a, _b;
var ListItem = /** @class */ (function () {
    function ListItem(name, time_inserted, time_limit, description) {
        this.enabled = true;
        this.name = name;
        this.time_inserted = time_inserted;
        this.time_limit = time_limit;
        this.description = description;
        this.done = false;
    }
    return ListItem;
}());
var userId = (_a = localStorage.getItem("curUser")) !== null && _a !== void 0 ? _a : "";
if (!userId) {
    throw new Error("Usuário não logado, por favor faça login");
}
var cards = document.getElementById("cards");
var itemlist = JSON.parse((_b = localStorage.getItem(userId)) !== null && _b !== void 0 ? _b : "{[]}");
var createForm = document.getElementById("createForm");
var nomeTarafa = document.getElementById("nomeTarafa");
var tempoTarafa = document.getElementById("tempoTarafa");
var descriçãoTarafa = document.getElementById("descriçãoTarafa");
createForm === null || createForm === void 0 ? void 0 : createForm.addEventListener("submit", function (event) {
    event.stopPropagation();
    var limit = "";
    if (tempoTarafa === null || tempoTarafa === void 0 ? void 0 : tempoTarafa.value)
        limit = (new Date(tempoTarafa === null || tempoTarafa === void 0 ? void 0 : tempoTarafa.value)).toString();
    var newItem = new ListItem(nomeTarafa === null || nomeTarafa === void 0 ? void 0 : nomeTarafa.value, (new Date()).toString(), limit, descriçãoTarafa === null || descriçãoTarafa === void 0 ? void 0 : descriçãoTarafa.value);
    itemlist.push(newItem);
    localStorage.setItem(userId, JSON.stringify(itemlist));
    listItems(itemlist);
    console.log();
});
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
function dateFormat(date) {
    return ([date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-') +
        ' ' +
        [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(':'));
}
function createCard(item) {
    var now = new Date();
    var text;
    var card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("p-3");
    card.classList.add("m-2");
    if (item.done) {
        card.classList.add("text-bg-success");
    }
    else if (now > (new Date(item.time_limit))) {
        card.classList.add("text-bg-danger");
    }
    else {
        card.classList.add("text-bg-primary");
    }
    var cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    cardHeader.classList.add("d-flex");
    cardHeader.classList.add("justify-content-end");
    cardHeader.classList.add("h-3");
    var close = document.createElement("a");
    var att = document.createAttribute("href");
    att.value = "list.html";
    close.classList.add("material-symbols-outlined");
    close.classList.add("text-white");
    close.setAttributeNode(att);
    text = document.createTextNode("X");
    close.appendChild(text);
    close.style.textDecoration = "none";
    cardHeader.appendChild(close);
    card.appendChild(cardHeader);
    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    var h2 = document.createElement("h2");
    text = document.createTextNode(item.name);
    h2.appendChild(text);
    cardBody.appendChild(h2);
    var h6 = document.createElement("h6");
    text = document.createTextNode(item.description);
    h6.appendChild(text);
    cardBody.appendChild(document.createElement("br"));
    cardBody.appendChild(h6);
    if (!item.description) {
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
    }
    else {
        cardBody.appendChild(document.createElement("br"));
        cardBody.appendChild(document.createElement("br"));
    }
    card.appendChild(cardBody);
    var cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    cardFooter.classList.add("d-flex");
    cardFooter.classList.add("justify-content-between");
    card.appendChild(cardFooter);
    var butDone = document.createElement("button");
    butDone.classList.add("btn");
    butDone.style.width = "48%";
    butDone.classList.add("mr-1");
    if (item.done) {
        butDone.classList.add("btn-secondary");
        text = document.createTextNode("Pendente");
    }
    else {
        butDone.classList.add("btn-success");
        text = document.createTextNode("Terminar");
    }
    butDone.appendChild(text);
    cardFooter.appendChild(butDone);
    var butEdit = document.createElement("button");
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
    butDone.addEventListener("click", function (event) {
        event.stopPropagation();
        item.done = !item.done;
        listItems(itemlist);
    });
    close.addEventListener("click", function (event) {
        event.stopPropagation();
        item.enabled = false;
        listItems(itemlist);
    });
    butEdit.addEventListener("click", function (event) {
        var form = document.getElementById("editForm");
        var nome = document.getElementById("EditNomeTarafa");
        var timeLimit = document.getElementById("EditTempoTarafa");
        var descricao = document.getElementById("EditDescriçãoTarafa");
        nome.value = item.name;
        timeLimit.value = item.time_limit;
        descricao.value = item.description;
        form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (event) {
            if (form.checkValidity()) {
                var limit = "";
                if (timeLimit.value)
                    limit = (new Date(timeLimit.value)).toString();
                form.classList.add('was-validated');
                item.name = nome.value;
                item.time_limit = limit;
                item.description = descricao.value;
                localStorage.setItem(userId, JSON.stringify(itemlist));
                window.location.replace("list.html");
            }
        });
    });
    return card;
}
function listItems(ilist) {
    ilist = ilist.filter(function (item) { return item.enabled; });
    localStorage.setItem(userId, JSON.stringify(itemlist));
    while (cards === null || cards === void 0 ? void 0 : cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }
    ilist.forEach(function (item) {
        cards === null || cards === void 0 ? void 0 : cards.append(createCard(item));
    });
}
window.onload = function () {
    listItems(itemlist);
};
