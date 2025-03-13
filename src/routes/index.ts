import express, { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import { createContact, deleteContact, getContacts } from "../services/contact";

const router = express.Router();

router.post("/contato", async (req, res) => {
  const { name } = req.body;

  if (!name || name.length < 2) {
    res.json({ error: "Nome invalido." });
    return;
  }

  await createContact(name);

  res.status(201).json({ contato: name });
});

router.get("/contatos", async (req, res) => {
  let list = await getContacts();

  res.json({ contatos: list });
});

router.delete("/contato", async (req, res) => {
  const name = req.query.name as string;

  if (!name) {
    res.json({ error: "Nome invalido." });
    return;
  }

  await deleteContact(name as string);

  res.json({ contato: name });
});

export default router;
