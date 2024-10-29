import express from "express";

import Interessado from "./Model/interessado.js"

import rotaInteressados from "./routes/rotaInteressados.js"
import rotaFilhotes from "./routes/rotafilhotes.js"

import cors from 'cors';

const app = express();
const host = "0.0.0.0"
const port = 4000;

app.use(cors({
    origin: "http://localhost:3000",
}))

app.use(express.json())

app.use('/interessados', rotaInteressados)
app.use('/filhotes', rotaFilhotes)

app.listen(port, host, ()=>{
    console.log(`Servidor rodando em: http://${host}:${port}`)
})

const interessado = new Interessado("", "Renata", "18991273126", "netoerenata@gmail.com", 7)

// interessado.incluir().then(() => {
//     console.log('Incluido com sucesso!')
// }).catch((err) => {
//     console.log('Error: ' + err)
// })

// interessado.excluir("6").then(() => {
//     console.log("A exclusão foi um sucesso!")
// }).catch((err) => {
//     console.log('Error: ' + err)
// })

interessado.consultar().then((listaInteressados) =>{
    for(const interessado of listaInteressados){
        console.log(interessado.toSring())
    }
}).catch((error) => {
    console.log("Erro ao consultar: " + error)
})

// interessado.alterar().then(() =>{
//     console.log('Alteração finalizada')
// }).catch((error) => {
//     console.log("Erro ao alterar: " + error)
// })