import express from "express";
import { readFile, writeFile } from "fs/promises";

const dataSource = "./data/list.txt";

const router = express.Router();

router.post("/contato", async (req, res) => {
  const { name } = req.body;

  if (!name || name.length < 2) {
    res.json({ error: "Nome invalido." });
    return;
  }

  // processamento de dados
  let list: string[] = [];
  try {
    const data = await readFile(dataSource, { encoding: "utf8" });
    list = data.split("\n");
  } catch (err) {}

  list.push(name);
  await writeFile(dataSource, list.join("\n"));

  res.status(201).json({ contato: name });
});

export default router;
