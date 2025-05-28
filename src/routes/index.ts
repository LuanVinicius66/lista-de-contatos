import express, { Router } from "express";
import {
  createContactController,
  deleteContactController,
  getContactsController,
} from "../controllers/contactController";

const router = express.Router();

//Listar todos os contatos
router.get("/contatos", getContactsController);
//Criar novos contatos
router.post("/contato", createContactController);
//Deletar contatos
router.delete("/contato", deleteContactController);

export default router;
