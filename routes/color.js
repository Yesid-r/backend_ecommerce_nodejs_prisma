import express from 'express'
const router = express();
import {create, findAll, update} from './../controllers/color_controller.js'

router.get('/', findAll)
router.post('/create', create)
router.put('/update/:colorId', update)
export default router