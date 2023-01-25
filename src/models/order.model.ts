import mongoose from 'mongoose'
import {Schema} from 'mongoose'


export interface OrderInput {
    user: string,
    items: string,
    count: string,
    total: string,
}

export interface OrderDocument extends OrderInput, mongoose.Document{
    created:Date
}

export const OrderScheams = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    items: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    count: { type: String, required: true },
    total: { type: String, required: true },
    created:{type:Date,default:Date.now}
})




export const OrderModel = mongoose.model<OrderDocument>('OrderModel', OrderScheams);