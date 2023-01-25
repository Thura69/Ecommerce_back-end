import mongoose from 'mongoose';
import { Schema } from 'mongoose';


export interface WarrentyInput {
    name: string,
    image: string,
    remark:string
}

export interface WarrentyDocument extends WarrentyInput, mongoose.Document{
    created:Date
}

const WarrentySchema = new Schema({
    name: { type: String, required: true,unique:true},
    image: { type: String, required: true },
    remark:{type:Array},
    created:{type:Date,default:Date.now}
})

export const WarrentyModel = mongoose.model<WarrentyDocument>('WarrentyModel', WarrentySchema);