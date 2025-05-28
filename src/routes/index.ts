import express, { Router } from "express";
import {
  createContactController,
  deleteContactController,
  getContactsController,
} from "../controllers/contactController";
import { privateRequest } from "../middlewares/auth";

const router = express.Router();

//Listar todos os contatos
router.get("/contatos", getContactsController);
//Criar novos contatos
router.post("/contato", privateRequest, createContactController);
//Deletar contatos
router.delete("/contato", privateRequest, deleteContactController);

export default router;
