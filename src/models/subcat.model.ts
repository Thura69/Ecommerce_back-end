import { array } from 'zod';

import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface SubInput{
    name: string,
    image: string,
    childCats: string[],
    catId:string
}

export interface SubDocument extends SubInput, mongoose.Document{
    created: Date;

}

const SubCatSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    catId:{type:Schema.Types.ObjectId,ref:"Category"},
    childCats: [{ type: Schema.Types.ObjectId, ref: "ChildCat" }],
    created: { type: Date, default: Date.now }
})


export const SubCatModel = mongoose.model<SubDocument>('SubCat', SubCatSchema);