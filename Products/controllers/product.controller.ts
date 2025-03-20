import Product from "../model/Product";
import { Request, Response } from "express";

const getProducts = async (req: Request, res: Response): Promise<void> => {
    
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, description, price, category, stock, images } = req.body;
    
    const missingFields = ["name", "description", "price", "category", "stock", "images"].filter(
        (field) => !req.body[field]
    );
    
    if (missingFields.length > 0) {
        res.status(400).json({ message: `${missingFields.join(", ")} is missing` });
    }
    
    try {
        const product = new Product({ name, description, price, category, stock, images });
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Id is missing" });
    }
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}

const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Id is missing" });
    }
    
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}


const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Id is missing" });
    }
    
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}

export { getProducts, createProduct, getProductById, updateProduct, deleteProduct };