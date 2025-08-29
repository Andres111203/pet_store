import { Router } from 'express';
import { create, findAll, update, remove } from '../controllers/mascota.controller.js';

const router = Router();

router.post('/', create);
router.get('/', findAll);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;