import mongoose, { Date } from "mongoose";
import { Schema } from "mongoose";


export interface CategoryInput {
    name: string,
    img: string,
    subcats: string;
}

export interface CategoryDocumet extends CategoryInput, mongoose.Document{
    create:Date
}


const CategorySchema = new Schema({
    name: { type: String, required: true,unique:true},
    image: { type: String, required: true },
    subcats: [{ type: Schema.Types.ObjectId, ref: 'SubCat' }],
    create:{type:Date,default:Date.now}
})


export const CategoryModel =  mongoose.model<CategoryDocumet>('Category', CategorySchema);
