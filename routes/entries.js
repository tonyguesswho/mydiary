import { Router } from "express";

import entriesController from "../controllers/entries";

import checkAuth from "../middleware/auth";
import entryField from "../middleware/entryField";
import fieldUndefined from "../middleware/fieldUndefined";
import checkUrl from "../middleware/url";
import canUpdate from "../middleware/canUpdate";

const router = Router();

router.get("/", checkAuth, entriesController.getAllEntries);

router.get("/:id", checkUrl, checkAuth, entriesController.getOneEntry);

router.post(
  "/",
  fieldUndefined,
  entryField,
  checkAuth,
  entriesController.addEntry
);

router.put(
  "/:id",
  checkUrl,
  fieldUndefined,
  entryField,
  checkAuth,
  canUpdate,
  entriesController.updateEntry
);

router.delete("/:id", checkAuth, entriesController.deleteOneEntry);

export default router;
