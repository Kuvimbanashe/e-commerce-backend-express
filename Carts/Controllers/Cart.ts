import Cart from "../model/Cart";
import { Request, Response } from "express";

const createCart = async (req:Request, res:Response) => {

    
    try {
        const cart = new Cart(req.body)
        await cart.save()
        res.status(201).send(cart);
    } catch (e) {
        res.status
    }
}

const getCarts = async (req:Request, res:Response) => {
    try {
        const cart = await Cart.find()
        res.send(cart)
    } catch (e) {
        res.status(500).send()
    }
}

const deleteCart = async (req:Request, res:Response)=>{
    const id = req.params.id

    try{
        if(!id){
            res.status(400).json({message:"Id required"})
        }
    
        const deletedCart = await Cart.findOneAndDelete({_id:id})
    
        if(!deletedCart){
            res.status(404).json({message :"Cart not found"})
        }
    
        res.status(200).json({message :"Cart deleted"})
    }
    catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }

}

const updateCart = async (req:Request, res:Response)=>{
    const id = req.params.id

    try{
        if(!id){
            res.status(400).json({message:"Id required"})
        }
    
        const updatedCart = await Cart.findOneAndUpdate({_id:id},req.body,{new:true})
    
        if(!updatedCart){
            res.status(404).json({message :"Cart not found"})
        }
    
        res.status(200).json({message :"Cart updated"})
    }
    catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }

}

