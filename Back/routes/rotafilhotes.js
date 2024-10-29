import { Router } from "express";

import FilhotesControl from "../Controller/filhoteControl.js";

const rotaFilhotes = Router();
const ctrlFilhote = new FilhotesControl();

rotaFilhotes.get("/", ctrlFilhote.consultar)
.get("/:search", ctrlFilhote.consultar)
.post("/", ctrlFilhote.gravar)
.put("/", ctrlFilhote.alterar)
.patch("/", ctrlFilhote.alterar)
.delete("/", ctrlFilhote.excluir)

export default rotaFilhotes;