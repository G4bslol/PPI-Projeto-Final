import { Router } from "express";

import InteressadoControl from "../Controller/interessadoControl.js";

const rotaInteressados = Router();
const ctrlInteress = new InteressadoControl();

rotaInteressados.get("/interessados", ctrlInteress.consultar)
.get("/interessados:search", ctrlInteress.consultar)
.post("/interessados", ctrlInteress.gravar)
.put("/interessados", ctrlInteress.alterar)
.patch("/interessados", ctrlInteress.alterar)
.delete("/interessados", ctrlInteress.excluir)

export default rotaInteressados;