import connect from "./connection.js"
import Partido from "../Model/partido.js"

export default class PartidoDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await connect();
            const sql = `CREATE TABLE IF NOT EXISTS partido (
                        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                        nome VARCHAR(100) NOT NULL,
                        sigla VARCHAR(5) NOT NULL,
                        numeroRegistro INT NOT NULL)`

            await conexao.execute(sql);
            await global.poolConnections.releaseConnection(conexao)
        }
        catch (error) {
            console.log(`Banco não iniciado: ${error}`)
        }

    }

    async gravar(partido) {
        console.log('Inserir\n')
        if (Partido instanceof Partido) {
            const conexao = await connect();
            const sql = `INSERT INTO partido(nome, sigla, numeroRegistro) VALUES (?, ?, ?)`
            const parametros = [
                partido.nome,
                partido.sigla,
                partido.numeroRegistro,
            ];
            await conexao.execute(sql, parametros);
            await global.poolConnections.releaseConnection(conexao)
        }
    }

    async alterar(partido) {
        console.log('Alterar\n')
        if (partido instanceof Partido) {
            const conexao = await connect();
            const sql = `UPDATE partido SET nome = ?,
                        sigla = ?,
                        numeroRegistro = ?,
                        WHERE (id = ?);`
            const parametros = [
                partido.nome,
                partido.sigla,
                partido.numeroRegistro,
                partido.id,
            ];
            await conexao.execute(sql, parametros);
            await global.poolConnections.releaseConnection(conexao)
        }
    }

    async excluir(partido) {
        console.log('Excluir\n')
        if (partido instanceof Partido) {
            const conexao = await connect();
            const sql = `DELETE FROM partido WHERE title = ?`;
            const parametros = [
                partido.title
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
            sql = `SELECT * FROM evento WHERE title = ? order by title;`;
            parametros.push(param)
        } else {
            sql = `SELECT * FROM evento order by title;`;
        }

        const conexao = await connect();
        const [registros] = await conexao.execute(sql, parametros);

        let eventList = [];
        for (const registro of registros) {
            const event = new Event(
                registro.title,
                registro.description,
                registro.local,
                registro.date,
                registro.ticketValue,
            );
            eventList.push(event)
        }
        await global.poolConnections.releaseConnection(conexao);
        return eventList;
    }
}