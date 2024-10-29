import { Router } from "express";

import InteressadoControl from "../Controller/interessadoControl.js";

const rotaInteressados = Router();
const ctrlInteress = new InteressadoControl();

rotaInteressados.get("/interessado-cadastro.html", ctrlInteress.consultar)
.get("/interessado-cadastro.html:search", ctrlInteress.consultar)
.post("/interessado-cadastro.html", ctrlInteress.gravar)
.put("/interessado-cadastro.html", ctrlInteress.alterar)
.patch("/interessado-cadastro.html", ctrlInteress.alterar)
.delete("/interessado-cadastro.html", ctrlInteress.excluir)

export default rotaInteressados;