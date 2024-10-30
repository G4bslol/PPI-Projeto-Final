import FilhoteDAO from "../DAO/filhoteDAO.js"

export default class Filhote {
    #especie
    #raca
    #id

    constructor(especie, raca, id) {
        this.#especie = especie
        this.#raca = raca
        this.#id = id
    }

    get especie() {
        return this.#especie
    }

    set especie(novoEspecie) {
        this.#especie = novoEspecie
    }

    get raca() {
        return this.#raca
    }

    set raca(newRaca) {
        this.#raca = newRaca
    }

    get id() {
        return this.#id
    }

    toSring() {
        return `
        ID:${this.#id}
        Espécie: ${this.#especie}
        Raça: ${this.#raca}`
    }

    toJSON() {
        return {
            id: this.#id,
            especie: this.#especie,
            raca: this.#raca,
        }
    }

    async incluir() {
        const filhoteDAO = new FilhoteDAO();
        await filhoteDAO.gravar(this);
    }

    async alterar() {
        const filhoteDAO = new FilhoteDAO();
        await filhoteDAO.alterar(this);
    }

    async excluir() {
        const filhoteDAO = new FilhoteDAO();
        await filhoteDAO.excluir(this);
    }

    async consultar(param) {
        const filhoteDAO = new FilhoteDAO();
        return await filhoteDAO.consultar(param);
    }
}