import { Router } from 'express';

import entriesController from '../controllers/entries';

const router = Router();

router.get('/', entriesController.getAllEntries);

router.get('/:id', entriesController.getOneEntry);

router.post('/', entriesController.addEntry);

router.put('/:id', entriesController.updateEntry);

router.delete('/:id', entriesController.deleteOneEntry);

export default router;
