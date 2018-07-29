import { Router } from "express";

import entriesController from "../controllers/entries";

import {checkAuth} from "../middleware/auth";

const router = Router();

router.get("/", checkAuth, entriesController.getAllEntries);

router.get("/:id", checkAuth, entriesController.getOneEntry);

router.post("/", checkAuth, entriesController.addEntry);

router.put("/:id", checkAuth, entriesController.updateEntry);

router.delete("/:id", checkAuth, entriesController.deleteOneEntry);

export default router;
