var form = document.getElementById("form");
var formEmail = document.getElementById("emailUsuario");
var formEmailError = document.getElementById("emailError");
var formPass = document.getElementById("senhaUsuario");
function auth(pass, user) {
    return pass === user.pass;
}
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
        var user = localStorage.getItem(formEmail === null || formEmail === void 0 ? void 0 : formEmail.value);
        if (!user) {
            while (formEmailError === null || formEmailError === void 0 ? void 0 : formEmailError.firstChild) {
                formEmailError === null || formEmailError === void 0 ? void 0 : formEmailError.removeChild(formEmailError === null || formEmailError === void 0 ? void 0 : formEmailError.firstChild);
            }
            var errorText = document.createTextNode("Usuário ou senha incorreto");
            formEmailError === null || formEmailError === void 0 ? void 0 : formEmailError.appendChild(errorText);
            formEmail === null || formEmail === void 0 ? void 0 : formEmail.classList.add("is-invalid");
        }
        else {
            var validated = auth(formPass === null || formPass === void 0 ? void 0 : formPass.value, JSON.parse(user));
            if (!validated) {
                while (formEmailError === null || formEmailError === void 0 ? void 0 : formEmailError.firstChild) {
                    formEmailError === null || formEmailError === void 0 ? void 0 : formEmailError.removeChild(formEmailError === null || formEmailError === void 0 ? void 0 : formEmailError.firstChild);
                }
                var errorText = document.createTextNode("Usuário ou senha incorreto");
                formEmailError === null || formEmailError === void 0 ? void 0 : formEmailError.appendChild(errorText);
                formEmail === null || formEmail === void 0 ? void 0 : formEmail.classList.add("is-invalid");
            }
            else {
                formEmail === null || formEmail === void 0 ? void 0 : formEmail.classList.remove("is-invalid");
                form.classList.add('was-validated');
                localStorage.setItem("curUser", JSON.parse(user).id);
                window.location.replace("list.html");
            }
        }
    }
});
