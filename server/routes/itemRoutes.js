const express = require('express');
const itemsController = require('../controller/itemsController');

const router = express.Router();

router.get('/', itemsController.getItems);
router.get('/:cv_cid', itemsController.getCourseItems);
router.post('/', itemsController.addItem);
router.delete('/:item_id', itemsController.deleteItem);
router.post('/add_all/:cv_cid', itemsController.addAllAvailableItems);
router.post('/download_selected', itemsController.getSelectedItems);
//get items per course

module.exports = router;
