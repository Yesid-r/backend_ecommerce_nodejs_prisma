import express from 'express'
const router = express();
import { allFilter, create, delete_product, findAll, findByCategory, findByName, findBySubCategory, find_product, update } from './../controllers/product_controller.js'



router.get('/', (req, res) => {
    const { name, category, subcategory } = req.query;

    if (name || category || subcategory) {
        allFilter(req, res)

    } else {
        findAll(req, res);
    }
});
router.post('/create', create)
router.put('/update/:productId', update)
router.delete('/:productId', delete_product)
router.get('/:productId', find_product)
router.get('/search-category/:category', findByCategory)
router.get('/search-subcategory/:subcategory', findBySubCategory)
router.get('/search', findByName);

export default router