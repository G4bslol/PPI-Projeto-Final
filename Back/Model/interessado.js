import interessadoDAO from "../DAO/interessadoDAO.js"

export default class Interessado {
    #cpf
    #nome
    #telefone
    #email
    #id

    constructor(cpf, nome, telefone, email, id) {
        this.#cpf = cpf
        this.#nome = nome
        this.#telefone = telefone
        this.#email = email
        this.#id = id
    }

    get cpf() {
        return this.#cpf
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf
    }

    get nome() {
        return this.#nome
    }

    set nome(novoNome) {
        this.#nome = novoNome
    }

    get telefone() {
        return this.#telefone
    }

    set telefone(newTelefone) {
        this.#telefone = newTelefone
    }

    get email() {
        return this.#email
    }

    set email(newEmail) {
        this.#email = newEmail
    }

    get id() {
        return this.#id
    }

    set id(newID) {
        this.#id = newID
    }

    toSring() {
        return `
        ID: ${this.#id}
        CPF: ${this.#cpf}
        Nome: ${this.#nome}
        Telefone: ${this.#telefone}
        Email: ${this.#email}`
    }

    toJSON() {
        return {
            id: this.#id,
            cpf: this.#cpf,
            nome: this.#nome,
            telefone: this.#telefone,
            email: this.#email,
        }
    }

    async incluir() {
        const interessDAO = new interessadoDAO();
        await interessDAO.gravar(this);
    }

    async alterar() {
        const interessDAO = new interessadoDAO();
        await interessDAO.alterar(this);
    }

    async excluir() {
        const interessDAO = new interessadoDAO();
        await interessDAO.remover(this);
    }

    async consultar(param) {
        const interessDAO = new interessadoDAO();
        return await interessDAO.consultar(param);
    }
}