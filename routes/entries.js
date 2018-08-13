import { Router } from "express";

import entriesController from "../controllers/entries";

import checkAuth from "../middleware/auth";
import entryField from "../middleware/entryField";
import fieldUndefined from "../middleware/fieldUndefined";
import checkUrl from "../middleware/url";
import canUpdate from "../middleware/canUpdate";
import { entryFields } from "../middleware/extraField";

const router = Router();

router.get("/", checkAuth, entriesController.getAllEntries);

router.get("/:id", checkUrl, checkAuth, entriesController.getOneEntry);

router.post(
  "/",
  fieldUndefined,
  entryFields,
  entryField,
  checkAuth,
  entriesController.addEntry
);

router.put(
  "/:id",
  checkUrl,
  fieldUndefined,
  entryFields,
  entryField,
  checkAuth,
  canUpdate,
  entriesController.updateEntry
);

router.delete("/:id", checkAuth, entriesController.deleteOneEntry);

export default router;
