import Review from "../model/Review";
import { Request, Response } from "express";


// Get all reviews
const getReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};


// Create a new review
const createReview = async (req: Request, res: Response): Promise<void> => {
    const { user, product, rating, comment } = req.body;

    const missingFields = ["user", "product", "rating", "comment"].filter(
        (field) => !req.body[field]
    );

    if (missingFields.length > 0) {
        res.status(400).json({ message: `${missingFields.join(", ")} is missing` });
    }

    try {
        const review = new Review({ user, product, rating, comment });
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}



// Get review by id
const getReviewById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Id is missing" });
    }
    try {
        const review = await  Review.findById(id)

        if (!review) {
            res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}


// Update review
const updateReview = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Id is missing" });
    }

    try {
        const review = await Review.findByIdAndUpdate
        (id
            , req.body
            , { new: true }
        );
        if (!review) {
            res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}


// Delete review
const deleteReview = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Id is missing" });
    }

    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}



