import express, { Router } from "express";
import {
  createContactController,
  deleteContactController,
  getContactsController,
} from "../controllers/contactController";
import { privateRequest } from "../middlewares/auth";
import multer from "multer";

const upload = multer({
  dest: "uploads/",
});

const router = express.Router();

//Listar todos os contatos
router.get("/contatos", getContactsController);
//Criar novos contatos
router.post(
  "/contato",
  upload.single("photo"),
  privateRequest,
  createContactController
);
//Deletar contatos
router.delete("/contato", privateRequest, deleteContactController);

export default router;
