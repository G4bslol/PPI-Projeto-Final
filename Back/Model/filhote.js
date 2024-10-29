import PartidoDAO from "../DAO/interessadoDAO.js"

export default class Partido {
    //Atributos privados
    #nome
    #sigla
    #registerNumber

    constructor(nome, sigla, registerNumber) {
        this.#nome = nome
        this.#sigla = sigla
        this.#registerNumber = registerNumber
    }

    get nome() {
        return this.#nome
    }

    set nome(novoNome) {
        this.#nome = novoNome
    }

    get sigla() {
        return this.#sigla
    }

    set sigla(newSigla) {
        this.#sigla = newSigla
    }

    get registerNumber() {
        return this.#registerNumber
    }

    set registerNumber(newRegisterNumber) {
        this.#registerNumber = newRegisterNumber
    }

    toSring() {
        return `Nome: ${this.#nome}\n
        Sigla: ${this.#sigla}\n
        Número de Reg.: ${this.#registerNumber}\n`
    }

    toJSON() {
        return {
            nome: this.#nome,
            sigla: this.#sigla,
            registerNumber: this.registerNumber,
        }
    }

    async incluir() {
        const partDAO = new PartidoDAO();
        await partDAO.gravar(this);
    }

    async alterar() {
        const partDAO = new PartidoDAO();
        await partDAO.alterar(this);
    }

    async excluir() {
        const partDAO = new PartidoDAO();
        await partDAO.excluir(this);
    }

    async consultar(param) {
        const partDAO = new PartidoDAO();
        return await partDAO.consultar(param);
    }
}