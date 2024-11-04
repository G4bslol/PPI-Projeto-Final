import Interessado from "../Model/interessado.js";

export default class InteressadoControl {

    gravar(req, res) {
        if (req.method == "POST" && req.is("application/json")) {
            const data = req.body;
            const nome = data.nome
            const cpf = data.cpf
            const telefone = data.telefone
            const email = data.email

            if (cpf && nome && telefone && email) {
                const interessado = new Interessado(cpf, nome, telefone, email);

                interessado.incluir().then(() => {
                    res.status(201).json({
                        "status": true,
                        "message": "Interessado incluído com sucesso!"
                    })
                }).catch((error) => {
                    res.status(500).json({
                        "status": false,
                        "message": "Erro ao incluir o interessado: " + error.message
                    })
                })
            }
            else {
                res.status(400).json({
                    "status": false,
                    "message": "Informe todos os dados do interessado!"
                })
            }
        }
        else {
            res.status(405).json({
                "status": false,
                "message": "Requisição invalida!"
            })
        }

    }

    alterar(req, res) {
        console.log('Alterar\n\n')
        if ((req.method == "PUT" || req.method == "PATCH") && req.is("application/json")) {
            const data = req.body;
            const cpf = data.cpf
            const nome = data.nome
            const telefone = data.telefone
            const email = data.email
            const id = data.id


            if (cpf && nome && telefone && email && id) {
                const interessado = new Interessado(cpf, nome, telefone, email, id);

                interessado.alterar().then(() => {
                    res.status(201).json({
                        "status": true,
                        "message": "Interessado alterado com sucesso!"
                    })
                }).catch((error) => {
                    res.status(500).json({
                        "status": false,
                        "message": "Erro ao alterar o interessado: " + error.message
                    })
                })
            }
            else {
                res.status(400).json({
                    "status": false,
                    "message": "Informe todos os dados do interessado!"
                })
            }
        }
    }

    excluir(req, res) {
        console.log('Excluir\n\n')
        if (req.method == "DELETE" && req.is("application/json")) {
            const data = req.body;
            const id = data.id
            const cpf = data.cpf
            const nome = data.nome
            const telefone = data.telefone
            const email = data.email

            if (id && cpf && nome && telefone && email) {
                const interessado = new Interessado(cpf, nome, telefone, email, id);
                interessado.excluir().then(() => {
                    res.status(200).json({
                        "status": true,
                        "message": "Interessado excluído com sucesso!"
                    })
                }).catch((error) => {
                    res.status(500).json({
                        "status": false,
                        "message": "Erro ao excluir o interessado: " + error.message
                    })
                })
            }
            else {
                res.status(400).json({
                    "status": false,
                    "message": "Requisição inválida, informe o ID do interessado!"
                });
            }
        } else {
            res.status(400).json({
                "status": false,
                "message": "Requisição inválida! Consulte a documentação."
            })
        }
    }

    consultar(req, res) {

        let search = req.params.search;

        if (!search) {
            search = ""
        }

        if (req.method == "GET") {
            const interessado = new Interessado()
            interessado.consultar(search).then((interessados) => {
                return res.status(200).json({
                    "status": true,
                    "listaInteressados": interessados

                })
            }).catch((error) => {
                res.status(500).json({
                    "status": false,
                    "message": "Erro ao consultar os eventos: " + error.message
                })
            })
        } else {
            res.status(405).json({
                "status": false,
                "message": "Requisição inválida! Consulte a documentação."
            });
        }
    }

}