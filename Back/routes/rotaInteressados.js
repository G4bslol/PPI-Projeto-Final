import { Router } from "express";

import InteressadoControl from "../Controller/interessadoControl.js";

const rotaInteressados = Router();
const ctrlInteress = new InteressadoControl();

rotaInteressados.get("/", ctrlInteress.consultar)
.get("/:search", ctrlInteress.consultar)
.post("/", ctrlInteress.gravar)
.put("/", ctrlInteress.alterar)
.patch("/", ctrlInteress.alterar)
.delete("/", ctrlInteress.excluir)

export default rotaInteressados;