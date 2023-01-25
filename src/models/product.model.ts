import mongoose from "mongoose";
import { Schema } from "mongoose";



export interface ProductInput {
    name: string,
    price: string,
    brand: string,
    cat: string,
    subCat: string,
    childCat: string,
    tag: string,
    discount: string,
    features: string[],
    description: string,
    status: string,
    delivery: string[],
    warrenty: string[],
    colors: string[],
    size: string,
    rating: string,
    images: string[],
}

export interface ProductDocument extends ProductInput, mongoose.Document{
    created:Date
}




const ProductSchema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    brand: { type: String, required: true },
    cat: { type: Schema.Types.ObjectId, ref: "Category" },
    subCat: { type: Schema.Types.ObjectId, ref: "SubCat" },
    childCat: { type: Schema.Types.ObjectId, ref: "ChildCat" },
    tag: { type: Schema.Types.ObjectId, ref: "Tags" },
    discount: { type: String, default: 0 },
    features: { type: Array, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: true },
    delivery: [{ type: Schema.Types.ObjectId, ref: "DeliveryModel" }],
    warrenty: [{ type: Schema.Types.ObjectId, ref: "WarrentyModel" }],
    colors: { type: Array, required: true },
    size: { type: String, required: true },
    rating: { type: String, default: "0" },
    images: { type: Array, required: true },
    created:{type:Date,default:Date.now}
})


export const productModel = mongoose.model<ProductDocument>("ProdcutModel", ProductSchema);
