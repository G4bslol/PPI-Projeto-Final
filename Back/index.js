import express from "express";

import Interessado from "./Model/interessado.js"

import rotaInteressados from "./routes/rotaInteressados.js"
import rotaFilhotes from "./routes/rotafilhotes.js"

import cors from 'cors';
import Filhote from "./Model/filhote.js";

const app = express();
const host = "0.0.0.0"
const port = 4000;

app.use(cors({
    origin: "http://localhost:3000",
}))


app.use('/interessados', rotaInteressados)
app.use('/filhotes', rotaFilhotes)

app.use(express.json())

app.listen(port, host, () => {
    console.log(`Servidor rodando em: http://${host}:${port}`)
})

const filhote = new Filhote("Gato", "Vira-lata", 3)


// filhote.incluir().then(() => {
//     console.log('Filhote incluido com sucesso!')
// }).catch((err) => {
//     console.log('Error: ' + err)
// })

// filhote.consultar().then((listaFilhotes) =>{
//     for(const filhote of listaFilhotes){
//         console.log(filhote.toSring())
//     }
// }).catch((error) => {
//     console.log("Erro ao consultar: " + error)
// })

filhote.alterar().then(() => {
    console.log('Alteração finalizada')
}).catch((error) => {
    console.log("Erro ao alterar: " + error)
})


const interessado = new Interessado("", "Renata", "18991273126", "netoerenata@gmail.com", "")

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


// interessado.alterar().then(() =>{
//     console.log('Alteração finalizada')
// }).catch((error) => {
//     console.log("Erro ao alterar: " + error)
// })