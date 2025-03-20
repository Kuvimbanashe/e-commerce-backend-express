import { Request, Response } from 'express';
import User from '../model/user.model';

const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, phone, password, role, address } = req.body;

    const missingFields = ['name', 'email', 'phone', 'password', 'role', 'address']
        .filter(field => !req.body[field]);

    if (missingFields.length > 0) {
         res.status(400).json({ message: `${missingFields.join(', ')} is missing` });
    }

    try {
        const user = new User({ name, email, phone, password, role, address });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
         res.status(400).json({ message: 'Id is missing' });
    }
    try {
        const user = await User.findById(id);
        if (!user) {
             res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
         res.status(400).json({ message: 'Id is missing' });
    }

    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
             res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
         res.status(400).json({ message: 'Id is missing' });
    }
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
             res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
};

export { getUsers, createUser, getUserById, updateUser, deleteUser };
