"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function makeId() {
    let outString = '';
    let inOptions = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
        outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    return outString;
}
class Aluno {
    constructor(nome, idade, altura, peso) {
        this.nome = nome;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
        this.id = makeId();
    }
}
class Turma {
    constructor(nome) {
        this.nome = nome;
        this.alunos = [];
        this.id = makeId();
    }
    getNumAlunos() {
        return this.alunos.length;
    }
    getMediaIdades() {
        if (this.alunos.length === 0)
            return 0;
        let sum = 0;
        this.alunos.forEach((aluno) => {
            sum += aluno.idade;
        });
        return Math.floor((sum / this.alunos.length) * 100) / 100;
    }
    getMediaAlturas() {
        if (this.alunos.length === 0)
            return 0;
        let sum = 0;
        this.alunos.forEach((aluno) => {
            sum += aluno.altura;
        });
        return Math.floor((sum / this.alunos.length) * 100) / 100;
    }
    getMediaPesos() {
        if (this.alunos.length === 0)
            return 0;
        let sum = 0;
        this.alunos.forEach((aluno) => {
            sum += aluno.peso;
        });
        return Math.floor((sum / this.alunos.length) * 100) / 100;
    }
}
const toTurma = (turma) => {
    let t = new Turma(turma.nome);
    turma.alunos.forEach((aluno) => {
        let a = new Aluno(aluno.nome, aluno.idade, aluno.altura, aluno.peso);
        a.id = aluno.id;
        t.alunos.push(a);
    });
    t.id = turma.id;
    return t;
};
var turmas;
if (localStorage.getItem("turmas")) {
    turmas = JSON.parse(localStorage.getItem("turmas"));
}
else {
    turmas = [];
}
var curTurma;
if (localStorage.getItem("curTurma")) {
    curTurma = toTurma(JSON.parse(localStorage.getItem("curTurma")));
}
else {
    curTurma = null;
}
var thead = document.getElementById("thead");
var tbody = document.getElementById("tbody");
var createBut = document.getElementById("createBut");
var createTurmaForm = document.getElementById("formCreateTurma");
var createAlunoForm = document.getElementById("formCreateAluno");
var editAlunoForm = document.getElementById("formEditAluno");
var createRandom = document.getElementById("createRandom");
var editRandom = document.getElementById("editRandom");
function killChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
function setTHead(type) {
    let text;
    let th;
    let scope;
    killChildren(thead);
    if (type === "Turma") {
        let fields = ["Id", "Nome", "Num Alunos", "Media Idades", "Media Alturas", "Media Pesos", "Ações"];
        fields.forEach((field) => {
            th = document.createElement("th");
            scope = document.createAttribute("scope");
            scope.value = "col";
            th.setAttributeNode(scope);
            text = document.createTextNode(field);
            th.appendChild(text);
            thead.appendChild(th);
        });
    }
    else if (type === "Aluno") {
        let fields = ["Id", "Nome", "Idade", "Altura", "Peso", "Ações"];
        fields.forEach((field) => {
            th = document.createElement("th");
            scope = document.createAttribute("scope");
            scope.value = "col";
            th.setAttributeNode(scope);
            text = document.createTextNode(field);
            th.appendChild(text);
            thead.appendChild(th);
        });
    }
}
function setLine(type, element, par) {
    let text;
    let tr;
    let td;
    let scope;
    if (type === "Turma") {
        element = toTurma(element);
        tr = document.createElement("tr");
        if (par) {
            tr.classList.add("table-secondary");
        }
        td = document.createElement("th");
        scope = document.createAttribute("scope");
        scope.value = "row";
        td.setAttributeNode(scope);
        text = document.createTextNode(element.id);
        td.appendChild(text);
        tr.appendChild(td);
        td = document.createElement("td");
        text = document.createTextNode(element.nome);
        td.appendChild(text);
        tr.appendChild(td);
        td = document.createElement("td");
        text = document.createTextNode(element.getNumAlunos().toString());
        td.appendChild(text);
        tr.appendChild(td);
        td = document.createElement("td");
        text = document.createTextNode(element.getMediaIdades().toString());
        td.appendChild(text);
        tr.appendChild(td);
        td = document.createElement("td");
        text = document.createTextNode(element.getMediaAlturas().toString());
        td.appendChild(text);
        tr.appendChild(td);
        td = document.createElement("td");
        text = document.createTextNode(element.getMediaPesos().toString());
        td.appendChild(text);
        tr.appendChild(td);
        td = document.createElement("td");
        td.classList.add("d-flex");
        td.classList.add("justify-content-start");
        let alunosbut = document.createElement("button");
        text = document.createTextNode("Ver alunos");
        alunosbut.appendChild(text);
        alunosbut.classList.add("btn");
        alunosbut.classList.add("btn-secondary");
        alunosbut.classList.add("ms-2");
        let removeBut = document.createElement("button");
        text = document.createTextNode("Remover");
        removeBut.appendChild(text);
        removeBut.classList.add("btn");
        removeBut.classList.add("btn-secondary");
        removeBut.classList.add("ms-2");
        td.appendChild(alunosbut);
        td.appendChild(removeBut);
        tr.append(td);
        tbody.append(tr);
        alunosbut.addEventListener("click", (event) => {
            element = toTurma(element);
            event.stopPropagation();
            curTurma = element;
            localStorage.setItem("curTurma", JSON.stringify(element));
            setPage("Aluno", element.alunos);
        });
        removeBut.addEventListener("click", (event) => {
            event.stopPropagation();
            turmas = turmas.filter((item) => item.id !== element.id);
            localStorage.setItem("turmas", JSON.stringify(turmas));
            setPage("Turma", turmas);
        });
    }
    else if (type === "Aluno") {
        element = element;
        tr = document.createElement("tr");
        if (par) {
            tr.classList.add("table-secondary");
        }
        td = document.createElement("th");
        scope = document.createAttribute("scope");
        scope.value = "row";
        td.setAttributeNode(scope);
        text = document.createTextNode(element.id);
        td.appendChild(text);
        tr.appendChild(td);
        td = document.createElement("td");
        text = document.createTextNode(element.nome);
        td.appendChild(text);
        tr.appendChild(td);
        td = document.createElement("td");
        text = document.createTextNode(element.idade.toString());
        td.appendChild(text);
        tr.appendChild(td);
        td = document.createElement("td");
        text = document.createTextNode(element.altura.toString());
        td.appendChild(text);
        tr.appendChild(td);
        td = document.createElement("td");
        text = document.createTextNode(element.peso.toString());
        td.appendChild(text);
        tr.appendChild(td);
        td = document.createElement("td");
        td.classList.add("d-flex");
        td.classList.add("justify-content-start");
        let alunosbut = document.createElement("button");
        scope = document.createAttribute("data-bs-toggle");
        scope.value = "modal";
        alunosbut.setAttributeNode(scope);
        scope = document.createAttribute("data-bs-target");
        scope.value = "#editAlunoModal";
        alunosbut.setAttributeNode(scope);
        text = document.createTextNode("Editar");
        alunosbut.appendChild(text);
        alunosbut.classList.add("btn");
        alunosbut.classList.add("btn-secondary");
        alunosbut.classList.add("ms-2");
        let removeBut = document.createElement("button");
        text = document.createTextNode("Remover");
        removeBut.appendChild(text);
        removeBut.classList.add("btn");
        removeBut.classList.add("btn-secondary");
        removeBut.classList.add("ms-2");
        td.appendChild(alunosbut);
        td.appendChild(removeBut);
        tr.append(td);
        tbody.append(tr);
        alunosbut.addEventListener("click", (event) => {
            event.stopPropagation();
            element = element;
            let nomeAlunoEdit = document.getElementById("nomeAlunoEdit");
            let idadeAlunoEdit = document.getElementById("idadeAlunoEdit");
            let alturaAlunoEdit = document.getElementById("alturaAlunoEdit");
            let pesoAlunoEdit = document.getElementById("pesoAlunoEdit");
            nomeAlunoEdit.value = element.nome;
            idadeAlunoEdit.value = element.idade.toString();
            alturaAlunoEdit.value = element.altura.toString();
            pesoAlunoEdit.value = element.peso.toString();
            editRandom.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
                let randUser = JSON.parse(yield ((yield fetch("https://randomuser.me/api/")).text())).results[0];
                nomeAlunoEdit.value = `${randUser.name.first} ${randUser.name.last}`;
                idadeAlunoEdit.value = randUser.dob.age.toString();
                alturaAlunoEdit.value = ((Math.round(Math.random() * 70) * 100) / 100 + 130).toString();
                pesoAlunoEdit.value = ((Math.round(Math.random() * 60) * 100) / 100 + 60).toString();
            }));
            editAlunoForm.addEventListener("submit", (event) => {
                element = element;
                if (editAlunoForm.checkValidity()) {
                    editAlunoForm.classList.add('was-validated');
                    element.nome = nomeAlunoEdit.value;
                    element.idade = Number(idadeAlunoEdit.value);
                    element.altura = parseFloat(alturaAlunoEdit.value);
                    element.peso = parseFloat(pesoAlunoEdit.value);
                    turmas.forEach((turma) => {
                        if (turma.id === (curTurma === null || curTurma === void 0 ? void 0 : curTurma.id))
                            turma.alunos = curTurma.alunos;
                    });
                    localStorage.setItem("turmas", JSON.stringify(turmas));
                    localStorage.setItem("curTurma", JSON.stringify(curTurma));
                }
            });
            localStorage.setItem("turmas", JSON.stringify(turmas));
            localStorage.setItem("curTurma", JSON.stringify(curTurma));
            if (curTurma)
                setPage("Aluno", curTurma.alunos);
        });
        removeBut.addEventListener("click", (event) => {
            event.stopPropagation();
            if (curTurma) {
                curTurma.alunos = curTurma.alunos.filter((item) => item.id !== element.id);
                turmas.forEach((turma) => {
                    if (turma.id === (curTurma === null || curTurma === void 0 ? void 0 : curTurma.id))
                        turma.alunos = curTurma.alunos;
                });
                localStorage.setItem("turmas", JSON.stringify(turmas));
                localStorage.setItem("curTurma", JSON.stringify(curTurma));
                setPage("Aluno", curTurma.alunos);
            }
        });
    }
}
function setTurmaTable() {
    rmTurmaTable();
    if (!curTurma)
        throw new Error("Turma não existe!!");
    let theadTurma = document.getElementById("theadTurma");
    let tbodyTurma = document.getElementById("tbodyTurma");
    let fields = ["Turma", "Num Alunos", "Media Idades", "Media Alturas", "Media Pesos"];
    let scope;
    let text;
    let th;
    let tr;
    fields.forEach((field) => {
        th = document.createElement("th");
        scope = document.createAttribute("scope");
        scope.value = "col";
        th.setAttributeNode(scope);
        text = document.createTextNode(field);
        th.appendChild(text);
        theadTurma.appendChild(th);
    });
    tr = document.createElement("tr");
    tr.classList.add("table-info");
    th = document.createElement("th");
    scope = document.createAttribute("scope");
    scope.value = "row";
    th.setAttributeNode(scope);
    text = document.createTextNode(curTurma.nome);
    th.appendChild(text);
    tr.appendChild(th);
    th = document.createElement("td");
    text = document.createTextNode(curTurma.getNumAlunos().toString());
    th.appendChild(text);
    tr.appendChild(th);
    th = document.createElement("td");
    text = document.createTextNode(curTurma.getMediaIdades().toString());
    th.appendChild(text);
    tr.appendChild(th);
    th = document.createElement("td");
    text = document.createTextNode(curTurma.getMediaAlturas().toString());
    th.appendChild(text);
    tr.appendChild(th);
    th = document.createElement("td");
    text = document.createTextNode(curTurma.getMediaPesos().toString());
    th.appendChild(text);
    tr.appendChild(th);
    tbodyTurma.appendChild(tr);
}
function rmTurmaTable() {
    let theadTurma = document.getElementById("theadTurma");
    let tbodyTurma = document.getElementById("tbodyTurma");
    while (theadTurma.firstChild)
        theadTurma.removeChild(theadTurma.firstChild);
    while (tbodyTurma.firstChild)
        tbodyTurma.removeChild(tbodyTurma.firstChild);
}
function setPage(target, arr) {
    setTHead(target);
    if (target === "Turma") {
        rmTurmaTable();
        createBut.setAttribute("data-bs-target", "#createTurmaModal");
        createBut.innerHTML = "Criar Turma";
        killChildren(tbody);
        let par = true;
        arr.forEach((turma) => {
            setLine(target, turma, par);
            par = !par;
        });
    }
    else if (target === "Aluno") {
        if (!curTurma)
            throw new Error("Turma não existe!!");
        setTurmaTable();
        createBut.setAttribute("data-bs-target", "#createAlunoModal");
        createBut.innerHTML = "Criar Aluno";
        killChildren(tbody);
        let par = true;
        arr.forEach((aluno) => {
            setLine(target, aluno, par);
            par = !par;
        });
    }
}
window.onload = () => {
    let returnLinks = document.getElementsByClassName("return");
    for (let i = 0; i < returnLinks.length; i++)
        returnLinks[i].addEventListener("click", () => localStorage.removeItem("curTurma"));
    if (localStorage.getItem("turmas")) {
        turmas = JSON.parse(localStorage.getItem("turmas"));
    }
    else {
        turmas = [];
    }
    if (localStorage.getItem("curTurma")) {
        curTurma = toTurma(JSON.parse(localStorage.getItem("curTurma")));
    }
    else {
        curTurma = null;
    }
    if (curTurma)
        setPage("Aluno", curTurma.alunos);
    else
        setPage("Turma", turmas);
    createTurmaForm.addEventListener("submit", (event) => {
        event.stopPropagation();
        let nomeTurma = document.getElementById("nomeTurma");
        if (createTurmaForm.checkValidity()) {
            createTurmaForm.classList.add('was-validated');
            turmas.push(new Turma(nomeTurma.value));
            localStorage.setItem("turmas", JSON.stringify(turmas));
            setPage("Turma", turmas);
        }
    });
    let nomeAluno = document.getElementById("nomeAluno");
    let idadeAluno = document.getElementById("idadeAluno");
    let alturaAluno = document.getElementById("alturaAluno");
    let pesoAluno = document.getElementById("pesoAluno");
    createRandom.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
        let randUser = JSON.parse(yield ((yield fetch("https://randomuser.me/api/")).text())).results[0];
        nomeAluno.value = `${randUser.name.first} ${randUser.name.last}`;
        idadeAluno.value = randUser.dob.age.toString();
        alturaAluno.value = ((Math.round(Math.random() * 70) * 100) / 100 + 130).toString();
        pesoAluno.value = ((Math.round(Math.random() * 60) * 100) / 100 + 60).toString();
    }));
    createAlunoForm.addEventListener("submit", (event) => {
        event.stopPropagation();
        if (!curTurma)
            throw new Error("Turma não existe!!");
        if (createAlunoForm.checkValidity()) {
            createAlunoForm.classList.add('was-validated');
            curTurma.alunos.push(new Aluno(nomeAluno.value, Number(idadeAluno.value), parseFloat(alturaAluno.value), parseFloat(pesoAluno.value)));
        }
        turmas.forEach((turma) => {
            if (turma.id === (curTurma === null || curTurma === void 0 ? void 0 : curTurma.id))
                turma.alunos = curTurma.alunos;
        });
        localStorage.setItem("turmas", JSON.stringify(turmas));
        localStorage.setItem("curTurma", JSON.stringify(curTurma));
        setPage("Aluno", curTurma.alunos);
    });
};
