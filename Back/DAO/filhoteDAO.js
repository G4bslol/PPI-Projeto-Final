import connect from "./connection.js"
import Filhote from "../Model/filhote.js"

export default class FilhoteDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await connect();
            const sql = `CREATE TABLE IF NOT EXISTS filhote (
                        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                        especie VARCHAR(100) NOT NULL,
                        raca VARCHAR(100) NOT NULL)`

            await conexao.execute(sql);
            await global.poolConnections.releaseConnection(conexao)
        }
        catch (error) {
            console.log(`Banco não iniciado: ${error}`)
        }

    }

    async gravar(filhote) {
        console.log('Inserir\n')
        if (filhote instanceof Filhote) {
            const conexao = await connect();
            const sql = `INSERT INTO filhote(especie, raca) VALUES (?, ?)`
            const parametros = [
                filhote.especie,
                filhote.raca,
            ];
            await conexao.execute(sql, parametros);
            await global.poolConnections.releaseConnection(conexao)
        }
    }

    async alterar(filhote) {
        console.log('Alterar\n')
        if (filhote instanceof Filhote) {
            const conexao = await connect();
            const sql = `UPDATE filhote SET
            especie = ?,
            raca = ?
            WHERE id = ?;`
            
            const parametros = [
                filhote.especie,
                filhote.raca,
                filhote.id,
            ];
            await conexao.execute(sql, parametros);
            await global.poolConnections.releaseConnection(conexao)
        }
    }

    async excluir(filhote) {
        console.log('Excluir\n')
        if (filhote instanceof Filhote) {
            const conexao = await connect();
            const sql = `DELETE FROM filhote WHERE id = ?`;
            const parametros = [
                filhote.id
            ]
            await conexao.execute(sql, parametros);
            await global.poolConnections.releaseConnection(conexao)
        }
    }

    async consultar(param) {
        console.log('Consultar\n')
        let sql = "";
        const parametros = [];
        if (param) {
            sql = `SELECT * FROM filhote WHERE raca = ? order by raca;`;
            parametros.push(param)
        }
        else {
            sql = `SELECT * FROM filhote order by id;`;
        }

        const conexao = await connect();
        const [registros] = await conexao.execute(sql, parametros);

        let listaFilhotes = [];
        for (const registro of registros) {
            const filhote = new Filhote(
                registro.especie,
                registro.raca,
                registro.id
            );
            listaFilhotes.push(filhote)
        }
        await global.poolConnections.releaseConnection(conexao);
        return listaFilhotes;
    }
}