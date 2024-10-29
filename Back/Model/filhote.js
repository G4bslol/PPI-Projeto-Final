import FilhoteDAO from "../DAO/filhoteDAO.js"

export default class Filhote {
    #id
    #especie
    #raca

    constructor(id, especie, raca) {
        this.#id = id
        this.#especie = especie
        this.#raca = raca
    }

    get id() {
        return this.#id
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

    toSring() {
        return `
        ID:${this.#id}\n
        Espécie: ${this.#especie}\n
        Raça: ${this.#raca}\n`
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