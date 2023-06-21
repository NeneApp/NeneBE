import { Request, Response } from "express";
import OrderModel  from '../models/Order.model'

/**
 * @description Create order
 * @method POST
 * @route /api/order
 * @access 
 */

export const createOrder = async (req: Request, res: Response) => {
    try {
        const newOrder = new OrderModel(req.body)

        const savedOrder = await newOrder.save();

        return res.status(201).json(savedOrder)
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * @description Get order
 * @method GET
 * @route /api/orders
 * @access 
 */
export const getOrder = async (req: Request, res: Response) => {
    try {
       const orders = await OrderModel.find();
       
       return res.status(200).json(orders)
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * @description Get order
 * @method GET
 * @route /api/orders
 * @access 
 */
export const getUserOrder = async (req: Request, res: Response) => {
    try {
       const orders = await OrderModel.find({ userId: req.user._id});
       
       return res.status(200).json(orders)
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * @description Update order
 * @method PUT
 * @route /api/orders/:id
 * @access 
 */
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const order = await OrderModel.findOne({ _id: req.params.id});

        if(!order) {
            return res.status(400).json({ msg: `Order not found with the id of ${req.params.id}` });
        }

        if(order.userId !== req.user._id) {
            return res.status(400).json({ msg: "Access to resource denied" });
        }

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            req.params.id, {
                $set: req.body
            },
            { new: true}
        );

        res.status(200).json(updatedOrder)
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * @description Delete order
 * @method PUT
 * @route /api/orders/:id
 * @access 
 */
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const order = await OrderModel.findOne({ _id: req.params.id});
        
        if(!order) {
            return res.status(400).json({ msg: `Order not found with the id of ${req.params.id}` });
        }

        if(order.userId !== req.user._id) {
            return res.status(400).json({ msg: "Access to resource denied" });
        }

        await OrderModel.findByIdAndRemove(req.params.id)

        res.status(200).json('Order has been deleted...');
    
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}