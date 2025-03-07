const Cart = require("../model/Cart")
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