import express from 'express'
import { Authenticate } from '../middlewares'
import { createOrder, deleteOrder, getOrder, getUserOrder, updateOrder } from '../controllers/Order.controller'

const router = express.Router()



router.post('/',Authenticate,createOrder )
router.get('/:id',Authenticate, getOrder)
router.get('/user', Authenticate, getUserOrder)
router.put('/:id', Authenticate, updateOrder)
router.delete('/:id', Authenticate, deleteOrder)

export default router