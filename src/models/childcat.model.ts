import mongoose from "mongoose";
import { Schema } from "mongoose";


export interface ChildCatInput {
    name: string,
    image: string,
    subcatId:string[]
}

export interface ChildCatDocument extends ChildCatInput,mongoose.Document{
    created:Date
}

export const ChildCatSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true }, 
    subcatId:{type:Schema.Types.ObjectId,ref:"SubCat"},
    created:{type:Date,default:Date.now}
})



export const ChildCatModel = mongoose.model<ChildCatDocument>('ChildCat', ChildCatSchema);
