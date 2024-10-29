import connect from "./connection.js"
import Interessado from "../Model/interessado.js"

export default class interessadoDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await connect();
            const sql = `CREATE TABLE IF NOT EXISTS interessado (
                        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                        cpf CHAR(11) NOT NULL,
                        nome VARCHAR(100) NOT NULL,
                        telefone CHAR(11) NOT NULL,
                        email INT NOT NULL)`

            await conexao.execute(sql);
            await global.poolConnections.releaseConnection(conexao)
        }
        catch (error) {
            console.log(`Banco não iniciado: ${error}`)
        }

    }

    async gravar(interessado) {
        console.log('Inserir\n')
        if (interessado instanceof Interessado) {
            const conexao = await connect();
            const sql = `INSERT INTO interessado(cpf, nome, telefone, email) VALUES (?, ?, ?, ?)`
            const parametros = [
                interessado.cpf,
                interessado.nome,
                interessado.telefone,
                interessado.email,
            ];
            await conexao.execute(sql, parametros);
            await global.poolConnections.releaseConnection(conexao)
        }
    }

    async alterar(interessado) {
        console.log('Alterar\n')
        if (interessado instanceof Interessado) {
            const conexao = await connect();
            const sql = `UPDATE interessado SET
                        cpf = ?,
                        nome = ?,
                        telefone = ?,
                        email = ?,
                        WHERE (id = ?);`
            const parametros = [
                interessado.cpf,
                interessado.nome,
                interessado.telefone,
                interessado.email,
                interessado.id,
            ];
            await conexao.execute(sql, parametros);
            await global.poolConnections.releaseConnection(conexao)
        }
    }

    async excluir(interessado) {
        console.log('Excluir\n')
        if (interessado instanceof Interessado) {
            const conexao = await connect();
            const sql = `DELETE FROM interessado WHERE id = ?`;
            const parametros = [
                interessado.id
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
            sql = `SELECT * FROM interessado WHERE nome = ? order by nome;`;
            parametros.push(param)
        } else {
            sql = `SELECT * FROM interessado order by nome;`;
        }

        const conexao = await connect();
        const [registros] = await conexao.execute(sql, parametros);

        let listaInteressado = [];
        for (const registro of registros) {
            const interessado = new Interessado(
                registro.cpf,
                registro.nome,
                registro.telefone,
                registro.email,
            );
            listaInteressado.push(interessado)
        }
        await global.poolConnections.releaseConnection(conexao);
        return listaInteressado;
    }
}