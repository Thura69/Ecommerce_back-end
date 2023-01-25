import { array } from 'zod';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';


export interface DeliveryInput {
    name: string,
    price: string,
    duration: string,
    image: string,
    remark:[]
}

export interface DeliveryDocument extends DeliveryInput, mongoose.Document{
    date:Date
}

const DeliverySchema = new Schema({
    name: { type: String, required: true,unique:true},
    price: { type: String, requried: true },
    duration: { type: String, required: true },
    image: { type: String, required: true },
    remark: { type: Array },
    created:{type:Date,default:Date.now}
})


export const DeliveryModel = mongoose.model<DeliveryDocument>("DeliveryModel", DeliverySchema);

