import mongoose from 'mongoose';
import { Schema } from 'mongoose';


export interface TagsInput {
    name: string,
    image:string
}

export interface TagsDocument extends TagsInput, mongoose.Document{
    created:Date
}


export const tagsSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    created:{type:Date,default:Date.now}
})



export const TagsModel = mongoose.model<TagsDocument>("Tags", tagsSchema);
