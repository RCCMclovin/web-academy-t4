var form: HTMLFormElement = document.getElementById("form") as HTMLFormElement;
var formEmail: HTMLInputElement = document.getElementById("emailUsuario") as HTMLInputElement;
var formEmailError: HTMLInputElement = document.getElementById("emailError") as HTMLInputElement;
var formPass: HTMLInputElement = document.getElementById("senhaUsuario") as HTMLInputElement;

interface User{
    name: string;
    email: string;
    id: string;
    pass: string;
}

function auth(pass: string, user: User): boolean{
    return pass === user.pass;
}

form?.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (form.checkValidity()) {
        let user: string|null = localStorage.getItem(formEmail?.value);
        if (!user) {
            while (formEmailError?.firstChild) {
                formEmailError?.removeChild(formEmailError?.firstChild);
            }
            let errorText = document.createTextNode("Usuário ou senha incorreto");
            formEmailError?.appendChild(errorText);
            formEmail?.classList.add("is-invalid");   
        } else {
            let validated: boolean = auth(formPass?.value, JSON.parse(user));
            if (!validated) {
                while (formEmailError?.firstChild) {
                    formEmailError?.removeChild(formEmailError?.firstChild);
                }
                let errorText = document.createTextNode("Usuário ou senha incorreto");
                formEmailError?.appendChild(errorText);
                formEmail?.classList.add("is-invalid");
            } else {
                formEmail?.classList.remove("is-invalid");
                form.classList.add('was-validated');
                localStorage.setItem("curUser", JSON.parse(user).id);
                window.location.replace("list.html");
            }
        }
    }
})