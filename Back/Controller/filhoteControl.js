import Filhote from "../Model/filhote.js";

export default class FilhoteControl {

    gravar(req, res) {
        if (req.method == 'POST' && req.is("application/json")) {
            const data = req.data;
            const id = data.id
            const especie = data.especie
            const raca = data.raca

            if (especie && raca) {
                const filhote = new Filhote(especie, raca);
                console.log(filhote)
                filhote.incluir().then(() => {
                    res.status(201).json({
                        "status": true,
                        "message": "filhote incluído com sucesso!"
                    })
                }).catch((error) => {
                    res.status(500).json({
                        "status": false,
                        "message": "Erro ao incluír o filhote: " + error.message
                    })
                })
            }
            else {
                res.status(400).json({
                    "status": false,
                    "message": "Informe todos os dados do filhote!"
                })
            }
        } else {
            res.status(400).json({
                "status": false,
                "message": "Informe todos os dados do filhote!"
            })
        }
    }

    alterar(req, res) {
        if ((req.method == "PUT" || req.method == "PATCH") && req.is("application/json")) {
            const data = req.data;
            const id = data.id;
            const especie = data.especie;
            const raca = data.raca;


            if (id && especie && raca) {
                const filhote = new Filhote(id, especie, raca);

                filhote.alterar().then(() => {
                    res.status(201).json({
                        "status": true,
                        "message": "filhote alterado com sucesso!"
                    })
                }).catch((error) => {
                    res.status(500).json({
                        "status": false,
                        "message": "Erro ao alterar o filhote: " + error.message
                    })
                })
            }
            else {
                res.status(400).json({
                    "status": false,
                    "message": "Informe todos os dados do filhote!"
                })
            }
        }
    }

    excluir(req, res) {
        if (req.method == "DELETE" && req.is("application/json")) {
            const dados = req.body;
            const id = dados.id;
            const especie = dados.especie;
            const raca = dados.raca;

            if (id) {
                const filhote = new Filhote(id, especie, raca);
                filhote.excluir().then(() => {
                    res.status(200).json({
                        "status": true,
                        "message": "filhote excluído com sucesso!"
                    })
                }).catch((error) => {
                    res.status(500).json({
                        "status": false,
                        "message": "Erro ao excluir o filhote: " + error.message
                    })
                })
            }
            else {
                res.status(400).json({
                    "status": false,
                    "message": "Requisição inválida, informe o ID do filhote!"
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
            const filhote = new Filhote()
            filhote.consultar(search).then((filhotes) => {
                return res.status(200).json({
                    "status": true,
                    "listafilhotes": filhotes

                })
            }).catch((error) => {
                res.status(500).json({
                    "status": false,
                    "message": "Erro ao consultar os filhotes: " + error.message
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