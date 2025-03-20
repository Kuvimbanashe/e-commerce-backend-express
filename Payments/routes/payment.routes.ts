import { getPayments, createPayment, getPaymentById, updatePayment, deletePayment } from '../controllers/payment.controllers';
import { Router } from 'express';

const router = Router();

router.get('/', getPayments);
router.post('/', createPayment);
router.get('/:id', getPaymentById);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);


module.exports = router;