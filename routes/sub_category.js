import express from 'express'
const router = express();
import {create, findAll, update} from './../controllers/subcategory_controller.js'

router.get('/', findAll)
router.post('/create', create)
router.put('/update/:subCategoryId', update)

export default router