import express from 'express'
const router = express();
import {create, findAll, update} from './../controllers/user_controller.js'

router.get('/', findAll)
router.post('/create', create)
router.put('/update/:userId', update)

export default router