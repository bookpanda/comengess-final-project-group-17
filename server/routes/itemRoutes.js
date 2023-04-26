// @ts-check

import { Router } from 'express';
import {
  getItems,
  addItem,
  deleteItem,
  addAllAvailableItems,
  getSelectedItems,
} from '../controller/itemsController.js';

const router = Router();

router.get('/', getItems);
router.post('/', addItem);
router.delete('/:item_id', deleteItem);
router.post('/add_all/:cv_cid', addAllAvailableItems);
router.post('/download_selected', getSelectedItems);

export default router;
