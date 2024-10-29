import Interessado from "../Model/interessado";

export default class InteressadoControl {

    gravar(req, res) {
        if (req.method == 'POST' && req.is("application/json")){
            const data = req.data;
            const cpf = data.cpf
            const nome = data.nome
            const telefone = data.telefone
            const email = data.email

            if (cpf && nome && telefone && email) {
                const interessado = new Interessado(cpf, nome, telefone, email);

                interessado.incluir().then(()=>{
                    res.status(201).json({
                        "status": true,
                        "message": "Interessado incluído com sucesso!"
                    })
                }).catch((error)=>{
                    res.status(500).json({
                        "status": false,
                        "message": "Erro ao incluír o interessado: " + error.message
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

    alterar(req, res) {
        if ((req.method == "PUT" || req.method == "PATCH") && req.is("application/json")) {
            const data = req.data;
            const cpf = data.cpf
            const nome = data.nome
            const telefone = data.telefone
            const email = data.email
            
            
            if (cpf && nome && telefone && email) {
                const interessado = new Interessado(cpf, nome, telefone, email);

                interessado.alterar().then(()=>{
                    res.status(201).json({
                        "status": true,
                        "message": "Interessado alterado com sucesso!"
                    })
                }).catch((error)=>{
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
        if (req.method == "DELETE" && req.is("application/json")) {
            const dados = req.body;
            const id = dados.id;

            if (id) {
                const interessado = new Interessado(id);
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
}