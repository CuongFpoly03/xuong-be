const express = require('express');
const { create, listRelated, list, read } = require( '../controllers/productController');
const router = express.Router();

router.post('/product', create);
router.get('/', list);
router.get('/:productId', read);
router.get('/related/:productId', listRelated);

module.exports= router;