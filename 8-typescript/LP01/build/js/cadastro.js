var form = document.getElementById("form");
var formName = document.getElementById("nomeUsuario");
var formEmail = document.getElementById("emailUsuario");
var formEmailConf = document.getElementById("emailConfUsuario");
var formPass = document.getElementById("senhaUsuario");
var formConfError = document.getElementById("confError");
function makeId() {
    var outString = '';
    var inOptions = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 8; i++) {
        outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    while (localStorage.getItem(outString)) { //Garantindo que a string é única
        outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    return outString;
}
var User = /** @class */ (function () {
    function User(name, email, pass) {
        this.name = name;
        this.email = email;
        this.pass = pass;
        this.id = makeId();
        //Salvando lista de eventos vazia
        localStorage.setItem(this.id, JSON.stringify([]));
        //Salvando usuário 
        localStorage.setItem(this.email, JSON.stringify(this));
    }
    User.prototype.auth = function (pass) {
        return pass === this.pass;
    };
    return User;
}());
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (formEmail !== formEmailConf) {
        while (formConfError === null || formConfError === void 0 ? void 0 : formConfError.firstChild) {
            formConfError === null || formConfError === void 0 ? void 0 : formConfError.removeChild(formConfError === null || formConfError === void 0 ? void 0 : formConfError.firstChild);
        }
        var errorText = document.createTextNode("Digite novamente o seu Email.");
        formConfError === null || formConfError === void 0 ? void 0 : formConfError.appendChild(errorText);
        formEmailConf === null || formEmailConf === void 0 ? void 0 : formEmailConf.classList.add("is-invalid");
    }
    if (formEmail === formEmailConf) {
        formEmailConf === null || formEmailConf === void 0 ? void 0 : formEmailConf.classList.remove("is-invalid");
    }
    if (form.checkValidity()) {
        form.classList.add('was-validated');
        var newUser = new User(formName === null || formName === void 0 ? void 0 : formName.value, formEmail === null || formEmail === void 0 ? void 0 : formEmail.value, formPass === null || formPass === void 0 ? void 0 : formPass.value);
        localStorage.setItem("curUser", newUser.id);
        window.location.replace("list.html");
    }
});
