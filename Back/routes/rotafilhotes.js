import { Router } from "express";

import FilhotesControl from "../Controller/filhoteControl.js";

const rotaFilhotes = Router();
const ctrlFilhote = new FilhotesControl();

rotaFilhotes.get("/filhote-cadastro.html", ctrlFilhote.consultar)
.get("/filhote-cadastro.html:search", ctrlFilhote.consultar)
.post("/filhote-cadastro.html", ctrlFilhote.gravar)
.put("/filhote-cadastro.html", ctrlFilhote.alterar)
.patch("/filhote-cadastro.html", ctrlFilhote.alterar)
.delete("/filhote-cadastro.html", ctrlFilhote.excluir)

export default rotaFilhotes;