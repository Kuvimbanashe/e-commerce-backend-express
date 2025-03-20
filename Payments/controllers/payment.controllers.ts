import Payment from "../model/Payment";
import { Request, Response } from "express";
const getPayments = async (req: Request, res: Response): Promise<void> => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// user: mongoose.Schema.Types.ObjectId;
//   order: mongoose.Schema.Types.ObjectId;
//   amount: number;
//   paymentMethod: "credit_card" | "paypal" | "crypto";
//   status: "pending" | "completed" | "failed" | "refunded" | "canceled";
const createPayment = async (req: Request, res: Response): Promise<void> => {
    const { user, order, paymentMethod,status } = req.body;

    const missingFields = ["user", "order", "paymentMethod","status"].filter(
        (field) => !req.body[field]
    );

    if (missingFields.length > 0) {
        res.status(400).json({ message: `${missingFields.join(", ")} is missing` });
    }

    try {
        const payment = new Payment({ user, order, paymentMethod,status });
        const newPayment = await payment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }

}


const getPaymentById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Id is missing" });
    }
    try {
        const payment = await Payment.findById(id);

        if (!payment) {
            res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}


const updatePayment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Id is missing" });
    }

    try {
        const payment = await Payment.findByIdAndUpdate(id, req.body, { new: true });
        if (!payment) {
            res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}


const deletePayment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Id is missing" });
    }

    try {
        const payment = await Payment.findByIdAndDelete(id);
        if (!payment) {
            res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}


export { getPayments, createPayment, getPaymentById, updatePayment, deletePayment };

