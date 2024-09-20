function makeId(): string {//Criando um Id aleatório para o usuário
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 16; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }

    return outString;
}

class Aluno{
    id: string;
    nome: string;
    idade: number;
    altura: number;
    peso: number;

    constructor(nome: string, idade: number, altura: number, peso: number) {
        this.nome = nome;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
        this.id = makeId();
    }
}
class Turma{
    id: string;
    nome: string;
    alunos: Aluno[];

    constructor(nome: string) {
        this.nome = nome;
        this.alunos = [];
        this.id = makeId();
    }

    public getNumAlunos(): number {
        return this.alunos.length;
    }

    public getMediaIdades(): number {
        if (this.alunos.length === 0) return 0;
        let sum = 0;
        this.alunos.forEach((aluno) => {
            sum += aluno.idade;
        })
        return Math.floor((sum / this.alunos.length)*100)/100;
    }

    public getMediaAlturas(): number {
        if (this.alunos.length === 0) return 0;
        let sum = 0;
        this.alunos.forEach((aluno) => {
            sum += aluno.altura;
        })
        return Math.floor((sum / this.alunos.length)*100)/100;
    }

    public getMediaPesos(): number {
        if (this.alunos.length === 0) return 0;
        let sum = 0;
        this.alunos.forEach((aluno) => {
            sum += aluno.peso;
        })
        return Math.floor((sum / this.alunos.length)*100)/100;
    }
}

const toTurma = <T extends Turma>(turma: T): Turma => {
    let t: Turma = new Turma(turma.nome);
    turma.alunos.forEach((aluno) => {
        let a: Aluno = new Aluno(aluno.nome, aluno.idade, aluno.altura, aluno.peso);
        a.id = aluno.id;
        t.alunos.push(a);
    })
    t.id = turma.id;
    return t;
}

var turmas: Turma[];
if (localStorage.getItem("turmas")) {
    turmas = JSON.parse(localStorage.getItem("turmas") as string);
} else {
    turmas = []; 
}
var curTurma: Turma|null; 
if (localStorage.getItem("curTurma")) {
    curTurma = toTurma(JSON.parse(localStorage.getItem("curTurma") as string));
} else {
    curTurma = null;
}
var thead: HTMLElement = document.getElementById("thead") as HTMLElement;
var tbody: HTMLElement = document.getElementById("tbody") as HTMLElement;
var createBut: HTMLElement = document.getElementById("createBut") as HTMLElement;
var createTurmaForm: HTMLFormElement = document.getElementById("formCreateTurma") as HTMLFormElement;
var createAlunoForm: HTMLFormElement = document.getElementById("formCreateAluno") as HTMLFormElement;
var editAlunoForm: HTMLFormElement = document.getElementById("formEditAluno") as HTMLFormElement;
var createRandom: HTMLElement = document.getElementById("createRandom") as HTMLElement;
var editRandom: HTMLElement = document.getElementById("editRandom") as HTMLElement;

function killChildren(element: HTMLElement) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function setTHead(type: string) {
    let text: Text;
    let th: HTMLElement;
    let scope: Attr;
    killChildren(thead);
    if (type === "Turma") {
        let fields: string[] = ["Id", "Nome", "Num Alunos", "Media Idades", "Media Alturas", "Media Pesos", "Ações"]
        fields.forEach((field) => {
            th = document.createElement("th");
            scope = document.createAttribute("scope");
            scope.value = "col";
            th.setAttributeNode(scope);
            text = document.createTextNode(field);
            th.appendChild(text);
            thead.appendChild(th);
        }) 
    } else if (type === "Aluno") {
        let fields: string[] = ["Id", "Nome", "Idade", "Altura", "Peso",  "Ações"]
        fields.forEach((field) => {
            th = document.createElement("th");
            scope = document.createAttribute("scope");
            scope.value = "col";
            th.setAttributeNode(scope);
            text = document.createTextNode(field);
            th.appendChild(text);
            thead.appendChild(th);
        }) 
    }
}

function setLine(type: string, element: Turma|Aluno, par: boolean) {
    let text: Text;
    let tr: HTMLElement;
    let td: HTMLElement;
    let scope: Attr;
    if (type === "Turma") {
        element = toTurma(element as Turma);
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
        let alunosbut: HTMLElement = document.createElement("button");
        text = document.createTextNode("Ver alunos");
        alunosbut.appendChild(text);
        alunosbut.classList.add("btn");
        alunosbut.classList.add("btn-secondary");
        alunosbut.classList.add("ms-2");

        let removeBut: HTMLElement = document.createElement("button");
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
            element = toTurma(element as Turma);
            event.stopPropagation();
            curTurma = element;
            localStorage.setItem("curTurma", JSON.stringify(element));
            setPage("Aluno", element.alunos);
        })

        removeBut.addEventListener("click", (event) => {
            event.stopPropagation();
            turmas = turmas.filter((item) => item.id !== element.id);
            localStorage.setItem("turmas", JSON.stringify(turmas));
            setPage("Turma", turmas);
        })
    } else if (type === "Aluno") {
        element = element as Aluno;
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
        let alunosbut: HTMLElement = document.createElement("button");
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
        let removeBut: HTMLElement = document.createElement("button");
        text = document.createTextNode("Remover");
        removeBut.appendChild(text);
        removeBut.classList.add("btn");
        removeBut.classList.add("btn-secondary");
        removeBut.classList.add("ms-2");

        td.appendChild(alunosbut);
        td.appendChild(removeBut);
        tr.append(td)
        tbody.append(tr);

        alunosbut.addEventListener("click", (event) => {
            event.stopPropagation();
            element = element as Aluno;
            let nomeAlunoEdit: HTMLInputElement = document.getElementById("nomeAlunoEdit") as HTMLInputElement;
            let idadeAlunoEdit: HTMLInputElement = document.getElementById("idadeAlunoEdit") as HTMLInputElement;
            let alturaAlunoEdit: HTMLInputElement = document.getElementById("alturaAlunoEdit") as HTMLInputElement;
            let pesoAlunoEdit: HTMLInputElement = document.getElementById("pesoAlunoEdit") as HTMLInputElement;

            nomeAlunoEdit.value = element.nome;
            idadeAlunoEdit.value = element.idade.toString();
            alturaAlunoEdit.value = element.altura.toString();
            pesoAlunoEdit.value = element.peso.toString();

            editRandom.addEventListener("click", async (event) => {
                let randUser = JSON.parse(await ((await fetch("https://randomuser.me/api/")).text())).results[0];
                nomeAlunoEdit.value = `${randUser.name.first} ${randUser.name.last}`;
                idadeAlunoEdit.value = randUser.dob.age.toString();
                alturaAlunoEdit.value = ((Math.round(Math.random() * 70) * 100) / 100 + 130).toString();
                pesoAlunoEdit.value = ((Math.round(Math.random() * 60) * 100) / 100 + 60).toString();
                
            })

            editAlunoForm.addEventListener("submit", (event) => {
                element = element as Aluno;
                if (editAlunoForm.checkValidity()) {
                    editAlunoForm.classList.add('was-validated');
                    element.nome = nomeAlunoEdit.value;
                    element.idade = Number(idadeAlunoEdit.value);
                    element.altura = parseFloat(alturaAlunoEdit.value);
                    element.peso = parseFloat(pesoAlunoEdit.value);
                    turmas.forEach((turma) => {
                        if (turma.id === curTurma?.id) turma.alunos = curTurma.alunos;
                    });
                    localStorage.setItem("turmas", JSON.stringify(turmas));
                    localStorage.setItem("curTurma", JSON.stringify(curTurma));
                }
            })
            localStorage.setItem("turmas", JSON.stringify(turmas));
            localStorage.setItem("curTurma", JSON.stringify(curTurma));
            
            if (curTurma) setPage("Aluno", curTurma.alunos);

        })

        removeBut.addEventListener("click", (event) => {
            event.stopPropagation();
            if (curTurma) {
                curTurma.alunos = curTurma.alunos.filter((item) => item.id !== element.id);
                turmas.forEach((turma) => {
                    if (turma.id === curTurma?.id) turma.alunos = curTurma.alunos;
                });
                localStorage.setItem("turmas", JSON.stringify(turmas));
                localStorage.setItem("curTurma", JSON.stringify(curTurma));
                setPage("Aluno", curTurma.alunos);
            }
        })
    }
}

function setTurmaTable() {
    rmTurmaTable();
    if (!curTurma) throw new Error("Turma não existe!!");
    let theadTurma: HTMLElement = document.getElementById("theadTurma") as HTMLElement;
    let tbodyTurma: HTMLElement = document.getElementById("tbodyTurma") as HTMLElement;
    let fields: string[] = ["Turma", "Num Alunos", "Media Idades", "Media Alturas", "Media Pesos"];
    let scope: Attr;
    let text: Text;
    let th: HTMLElement;
    let tr: HTMLElement;
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
    let theadTurma: HTMLElement = document.getElementById("theadTurma") as HTMLElement;
    let tbodyTurma: HTMLElement = document.getElementById("tbodyTurma") as HTMLElement;

    while (theadTurma.firstChild) theadTurma.removeChild(theadTurma.firstChild);
    while (tbodyTurma.firstChild) tbodyTurma.removeChild(tbodyTurma.firstChild);
}

function setPage(target: string, arr: Turma[] | Aluno[]) { 
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
    } else if (target === "Aluno") {
        if (!curTurma) throw new Error("Turma não existe!!");
        setTurmaTable()
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
    let returnLinks: HTMLCollection = document.getElementsByClassName("return");
    for (let i = 0; i < returnLinks.length; i++)
        returnLinks[i].addEventListener("click", () => localStorage.removeItem("curTurma"));
    
    if (localStorage.getItem("turmas")) {
        turmas = JSON.parse(localStorage.getItem("turmas") as string);
    } else {
        turmas = []; 
    }
    if (localStorage.getItem("curTurma")) {
        curTurma = toTurma(JSON.parse(localStorage.getItem("curTurma") as string));
    } else {
        curTurma = null;
    }
    if(curTurma) setPage("Aluno", curTurma.alunos);
    else setPage("Turma", turmas);
    createTurmaForm.addEventListener("submit", (event) => {
        event.stopPropagation();
        let nomeTurma: HTMLInputElement = document.getElementById("nomeTurma") as HTMLInputElement;
        if (createTurmaForm.checkValidity()) {
            createTurmaForm.classList.add('was-validated');
            turmas.push(new Turma(nomeTurma.value));
            localStorage.setItem("turmas", JSON.stringify(turmas));
            setPage("Turma", turmas);
        }
    });

    let nomeAluno: HTMLInputElement = document.getElementById("nomeAluno") as HTMLInputElement;
    let idadeAluno: HTMLInputElement = document.getElementById("idadeAluno") as HTMLInputElement;
    let alturaAluno: HTMLInputElement = document.getElementById("alturaAluno") as HTMLInputElement;
    let pesoAluno: HTMLInputElement = document.getElementById("pesoAluno") as HTMLInputElement;

    createRandom.addEventListener("click", async (event) => {
        let randUser = JSON.parse(await ((await fetch("https://randomuser.me/api/")).text())).results[0];
        nomeAluno.value = `${randUser.name.first} ${randUser.name.last}`;
        idadeAluno.value = randUser.dob.age.toString();
        alturaAluno.value = ((Math.round(Math.random() * 70)*100)/100 + 130).toString();
        pesoAluno.value = ((Math.round(Math.random() * 60)*100)/100 + 60).toString();
    })

    createAlunoForm.addEventListener("submit", (event) => {
        event.stopPropagation();

        if (!curTurma) throw new Error("Turma não existe!!");
        if (createAlunoForm.checkValidity()) {
            createAlunoForm.classList.add('was-validated');
            curTurma.alunos.push(new Aluno(nomeAluno.value, Number(idadeAluno.value), parseFloat(alturaAluno.value),
                parseFloat(pesoAluno.value)));
        }
        turmas.forEach((turma) => {
            if (turma.id === curTurma?.id) turma.alunos = curTurma.alunos;
        });
        localStorage.setItem("turmas", JSON.stringify(turmas));
        localStorage.setItem("curTurma", JSON.stringify(curTurma));

        setPage("Aluno", curTurma.alunos);
    })
};