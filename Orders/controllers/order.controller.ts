import Order from "../model/Order";
import e, { Request, Response } from "express";


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


const getOrderById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: 'Id is missing' });
    }
    try {
        const order = await Order.findById(id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}


const updateOrder = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params;

    const { user, products, totalPrice, status } = req.body;
    if (!id) {
        res.status(400).json({ message: 'Id is missing' });
    }

    try {
        const order = await Order.findByIdAndUpdate(id, { user, products, totalPrice, status }, { new: true });
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}


const deleteOrder = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: 'Id is missing' });
    }

    try {
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}


export { getOrders, createOrder, getOrderById, updateOrder, deleteOrder };


