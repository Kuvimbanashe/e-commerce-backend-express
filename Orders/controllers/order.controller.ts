import Order from "../model/Order";
import { Request, Response } from "express";

//  user: mongoose.Schema.Types.ObjectId;
//   products: { product: mongoose.Schema.Types.ObjectId; quantity: number }[];
//   totalPrice: number;
//   status: "pending" | "shipped" | "delivered" | "cancelled";



const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};


const createOrder = async (req: Request, res: Response): Promise<void> => {
    const { user, products, totalPrice, status} = req.body;

    const missingFields = ['user', 'products', 'totalPrice', 'status']
        .filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        res.status(400).json({ message: `${missingFields.join(', ')} is missing` });
    }

    try {
        const order = new Order({ user, products, totalPrice, status });
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};





