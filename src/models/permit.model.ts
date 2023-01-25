import mongoose from 'mongoose';
import { Schema } from 'mongoose';

export interface PermitInput extends mongoose.Document{
    name:string
}


const PermitSchema = new Schema({
    name: { type: String, required: true,unique:true },
})

const PermitModel = mongoose.model<PermitInput>("Permit", PermitSchema);

export default PermitModel;