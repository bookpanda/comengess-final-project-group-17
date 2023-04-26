// @ts-check

import { Router } from 'express';

import {
  getItems,
  getCourseItems,
  addItem,
  deleteItem,
  addAllAvailableItems,
  getSelectedItems,
} from '../controller/itemsController.js';

const router = Router();

router.get('/', getItems);
router.get('/:cv_cid', getCourseItems);
router.post('/', addItem);
router.delete('/:item_id', deleteItem);
router.post('/add_all/:cv_cid', addAllAvailableItems);
router.post('/download_selected', getSelectedItems);
// get items per course

export default router;
