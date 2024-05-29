import express from 'express'
const router = express();
import {create, findAll} from './../controllers/order_controller.js'

router.get('/', findAll)
router.post('/create', create)

export default router