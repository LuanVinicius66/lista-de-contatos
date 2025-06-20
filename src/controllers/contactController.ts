import { RequestHandler } from "express";
import { createContact, deleteContact, getContacts } from "../services/contact";
import sharp from "sharp";

export const getContactsController: RequestHandler = async (req, res) => {
  let list = await getContacts();
  res.json({ contatos: list });
};

export const createContactController: RequestHandler = async (req, res) => {
  const { name } = req.body;

  if (!req.file || (req.file && !req.file.mimetype.includes("image"))) {
    res.json({
      error: "Nenhuma imagem recebida",
    });
    return;
  }

  if (!name || name.length < 2) {
    res.json({
      error: "Nome invalido. Ao menos 2 caracteres são necessários.",
    });
    return;
  }

  await sharp(req.file.path)
    .resize(300, 300, { fit: "cover" })
    .toFile("public/avatars/" + req.file.filename + ".jpg");

  await createContact(name);

  res
    .status(201)
    .json({
      contato: name,
      photo: "http://localhost:3000/avatars/" + req.file.filename + ".jpg",
    });
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
