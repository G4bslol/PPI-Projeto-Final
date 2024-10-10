import express from 'express';

const host = '0.0.0.0';
const port = '3333';

const app = express();

app.use(express.static('./public'))

app.listen(port, host, ()=>{
    console.log(`Servidor Front-End rodando em http://${host}:${port}`)
})
