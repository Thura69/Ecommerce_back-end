import { string } from 'zod';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

export interface OrderItemsInput{
    order: string,
    count: string,
    productId: string,
    name: string,
    price: string,
    status: [],
}

export interface OrderItemsDocument extends OrderItemsInput, mongoose.Document{
    created:Date
}


export const OrderItemsSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: "Order",required:true},
    count: { type: String, default: "1" },
    productId: { type: Schema.Types.ObjectId, ref: "ProdcutModel", required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, enum: ["ACCEPTED", "PENDING", "DELIVERED"],default:"ACCEPTED" },
    created:{type:Date,default:Date.now}
    
})


export const OrderItemsModel = mongoose.model<OrderItemsDocument>('Order', OrderItemsSchema);