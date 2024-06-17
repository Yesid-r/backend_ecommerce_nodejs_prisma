import express from 'express'
const router = express();
import {create, delete_product, findAll, findByCategory, findBySubCategory, find_product, update} from './../controllers/product_controller.js'



router.get('/', findAll)
router.post('/create', create)
router.put('/update/:productId', update)
router.delete('/:productId', delete_product)
router.get('/:productId', find_product)
router.get('/search-category/:category', findByCategory)
router.get('/search-subcategory/:subcategory', findBySubCategory)


export default router