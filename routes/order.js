import express from 'express'
const router = express();
import {confirmation, create, findAll, findByIdUser} from './../controllers/order_controller.js'
import { verifyUser } from '../controllers/utils/verifyToken.js';

router.get('/', findAll)
router.get('/:userId', findByIdUser)
router.post('/create',verifyUser ,create)
router.post('/epayco/confirmation', confirmation)

export default router