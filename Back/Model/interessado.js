import interessadoDAO from "../DAO/interessadoDAO.js"

export default class Interessado {
    #id
    #cpf
    #nome
    #telefone
    #email

    constructor(id, cpf, nome, telefone, email) {
        this.#id = id
        this.#cpf = cpf
        this.#nome = nome
        this.#telefone = telefone
        this.#email = email
    }

    get id() {
        return this.#id
    }

    set id(novoid) {
        this.#id = novoid
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

    toSring() {
        return `
        CPF: ${this.#cpf}\n
        Nome: ${this.#nome}\n
        Telefone: ${this.#telefone}\n
        Email: ${this.#email}\n`
    }

    toJSON() {
        return {
            id: this.id,
            cpf: this.#cpf,
            nome: this.#nome,
            telefone: this.#telefone,
            email: this.email,
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
        await interessDAO.excluir(this);
    }

    async consultar(param) {
        const interessDAO = new interessadoDAO();
        return await interessDAO.consultar(param);
    }
}