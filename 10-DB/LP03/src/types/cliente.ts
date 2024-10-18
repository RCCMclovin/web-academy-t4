import Endereco from './endereco'
class Cliente{
    private _CPF: string;
    private _nome: string;
    private _telefone: string;
    private _email: string;
    private _DoB: Date;
    private _Enderecos_Cliente: Endereco[] = [];

    constructor(CPF: string, nome: string, telefone: string, email: string, DoB: Date) {
        this._CPF = CPF;
        this._nome = nome;
        this._telefone = telefone;
        this._email = email;
        this._DoB = DoB;
    }

    get CPF() {
        return this._CPF
    }

    set CPF(cpf: string) {
        this.CPF = cpf;
    }

    get nome() {
        return this._nome;
    }

    set nome(nome: string) {
        this._nome = nome;
    }

    get telefone() {
        return this._telefone;
    }

    set telefone(telefone: string) {
        this._telefone = telefone;
    }

    get email() {
        return this._email;
    }

    set email(email: string) {
        this._email = email;
    }

    get DoB() {
        return this._DoB;
    }

    set DoB(dob: Date) {
        this._DoB = dob;
    }

    get enderecos() {
        return this._Enderecos_Cliente;
    }

    public add_endereco(end: string) {
        this._Enderecos_Cliente.push(new Endereco(end));
    }

    public remove_pos(pos: number) {
        if (pos < this._Enderecos_Cliente.length && pos >= 0) {
            this._Enderecos_Cliente.splice(pos, 1);
        }else {
            console.log("Posição fora do vetor");
        }
    }
    public remove_end(end: string) {
        this._Enderecos_Cliente.filter((e) => e.Endereco != end);
    }
    public clear_end() {
        this._Enderecos_Cliente = [];
    }
}

export default Cliente;