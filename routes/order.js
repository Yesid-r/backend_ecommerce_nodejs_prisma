import express from 'express'
const router = express();
import {create, findAll, findByIdUser} from './../controllers/order_controller.js'

router.get('/', findAll)
router.get('/:userId', findByIdUser)
router.post('/create', create)

export default router