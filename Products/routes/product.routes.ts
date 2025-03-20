import { getProducts, createProduct, getProductById, updateProduct, deleteProduct }  from '../controllers/product.controller';
import e, { Router } from 'express';


const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;