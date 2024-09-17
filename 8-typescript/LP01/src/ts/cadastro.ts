
var form: HTMLFormElement = document.getElementById("form") as HTMLFormElement;
var formName: HTMLInputElement = document.getElementById("nomeUsuario") as HTMLInputElement;
var formEmail: HTMLInputElement = document.getElementById("emailUsuario") as HTMLInputElement;
var formEmailConf: HTMLInputElement = document.getElementById("emailConfUsuario") as HTMLInputElement;
var formPass: HTMLInputElement = document.getElementById("senhaUsuario") as HTMLInputElement;
var formConfError: HTMLElement = document.getElementById("confError") as HTMLElement;


function makeId(): string {//Criando um Id aleatório para o usuário
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 8; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    while (localStorage.getItem(outString)) {//Garantindo que a string é única
        outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }

    return outString;
}

class User{
    name: string;
    email: string;
    id: string;
    pass: string;

    constructor(name: string, email: string, pass: string) {
        this.name = name;
        this.email = email;
        this.pass = pass;
        this.id = makeId();
        //Salvando lista de eventos vazia
        localStorage.setItem(this.id, JSON.stringify([]));
        //Salvando usuário 
        localStorage.setItem(this.email, JSON.stringify(this))
    }
}

form?.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (formEmail !== formEmailConf) {
        while (formConfError?.firstChild) {
            formConfError?.removeChild(formConfError?.firstChild);
        }
        let errorText = document.createTextNode("Digite novamente o seu Email.");
        formConfError?.appendChild(errorText);
        formEmailConf?.classList.add("is-invalid");        
    } else if (form.checkValidity()) {
        form.classList.add('was-validated');
        let newUser = new User(formName?.value, formEmail?.value, formPass?.value);
        localStorage.setItem("curUser", newUser.id);
        window.location.replace("list.html");
    }
})