import express from "express";

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