import { getOrders, createOrder, getOrderById, updateOrder, deleteOrder } from '../controllers/order.controller';
import { Router } from 'express';

const router = Router();


router.get('/', getOrders);
router.post('/', createOrder);  
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);


module.exports = router;