import express from 'express'
const router = express();
import {create, findAll, find_delete, getOne, update} from './../controllers/category_controller.js'

router.get('/', findAll)
router.post('/create', create)
router.delete('/delete/:categoryId', find_delete)
router.put('/update/:categoryId', update)
router.get('/:categoryId/subcategories', getOne)

export default router