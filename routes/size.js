import express from 'express'
const router = express();
import {create, findAll, update} from './../controllers/size_controller.js'

router.get('/', findAll)
router.post('/create', create)
router.put('/update/:sizeId', update)

export default router