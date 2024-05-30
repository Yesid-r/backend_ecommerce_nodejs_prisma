import express from 'express'
const router = express();
import {create, findAll, update} from './../controllers/product_controller.js'

router.get('/', findAll)
router.post('/create', create)
router.put('/update/:productId', update)

export default router