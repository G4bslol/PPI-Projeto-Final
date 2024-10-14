import express from "express";

import cors from 'cors';

const app = express();
const host = "0.0.0.0"
const port = 4000;

app.use(cors({
    origin: "http://localhost:3333",
}))

app.use(express.json())

app.use('/partidos', rotaPartidos)

app.listen(port, host, ()=>{
    console.log(`Servidor rodando em: http://${host}:${port}`)
})