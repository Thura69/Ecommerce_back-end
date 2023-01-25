import { PermitInput } from './permit.model';
import mongoose from "mongoose";
import { Schema } from "mongoose";


export interface RoleInput extends mongoose.Document{
    name: string,
    permit:PermitInput['name']
}


const RoleSchema = new Schema({
    name: { type: String, required: true },
    permits:[{type:mongoose.Schema.Types.ObjectId,ref:"Permit"}]
})



const RoleModel = mongoose.model<RoleInput>("Role", RoleSchema);
export default RoleModel;