import { Router } from "express";

import entriesController from "../controllers/entries";

import checkAuth from "../middleware/auth";
import entryField from "../middleware/entryField";

const router = Router();

router.get("/", checkAuth, entriesController.getAllEntries);

router.get("/:id", checkAuth, entriesController.getOneEntry);

router.post("/", entryField, checkAuth, entriesController.addEntry);

router.put("/:id", entryField, checkAuth, entriesController.updateEntry);

router.delete("/:id", checkAuth, entriesController.deleteOneEntry);

export default router;
