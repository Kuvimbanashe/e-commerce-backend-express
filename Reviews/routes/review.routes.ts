//import the functions from the controller
import { getReviews, createReview, getReviewById, updateReview, deleteReview } from '../controllers/review.controller';
import { Router } from 'express';

const router = Router();


router.get('/', getReviews);
router.post('/', createReview);
router.get('/:id', getReviewById);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);    


module.exports = router;