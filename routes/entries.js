import { Router } from 'express';

import entriesController from '../controllers/entries';

import { checkAuth } from '../middleware/auth';

const router = Router();

router.get('/', entriesController.getAllEntries);

router.get('/:id', entriesController.getOneEntry);

router.post('/', checkAuth, entriesController.addEntry);

router.put('/:id', entriesController.updateEntry);

router.delete('/:id', entriesController.deleteOneEntry);

export default router;
