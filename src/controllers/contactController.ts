import { RequestHandler } from "express";
import { createContact, deleteContact, getContacts } from "../models/contact";

export const getContactsController: RequestHandler = async (req, res) => {
  let list = await getContacts();
  res.json({ contatos: list });
};

export const createContactController: RequestHandler = async (req, res) => {
  const { name } = req.body;

  if (!name || name.length < 2) {
    res.json({
      error: "Nome invalido. Ao menos 2 caracteres são necessários.",
    });
    return;
  }

  await createContact(name);

  res.status(201).json({ contato: name });
};

export const deleteContactController: RequestHandler = async (req, res) => {
  const name = req.query.name as string;

  if (!name) {
    res.json({ error: "Nome invalido." });
    return;
  }

  await deleteContact(name as string);

  res.json({ contato: name });
};
