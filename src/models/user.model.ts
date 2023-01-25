import { NextFunction } from 'express';
import mongoose from "mongoose";
import { Schema } from "mongoose";
import { PermitInput } from './permit.model';
import { RoleInput } from './role.model';
import bcrypt from 'bcrypt';
import config from 'config';



export interface UserInput {
    name: string,
    email: string,
    phone: string,
    password: string,
    roles: RoleInput['_id'],
    permits: PermitInput['_id'],
}

export interface UserDocument extends UserInput, mongoose.Document{
    created: Date,
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, uniqued: true },
    phone: { type: String, required: true, uniqued: true },
    password: { type: String, required: true },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
    permits: [{ type: Schema.Types.ObjectId, ref: "Permit" }],
    created:{type:Date,default:Date.now}
})

UserSchema.pre("save", async function (next) {
    let user = this as UserDocument;

    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltGenerate'));
    const hash = bcrypt.hashSync(user.password, salt);

    if (hash) {
        user.password = hash;
        next();
    }


    
})


UserSchema.methods.comparePassword = async function (candidatePassword:string):Promise<Boolean> {
    let user = this as UserDocument;

    return bcrypt.compareSync(candidatePassword, user.password);
}

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
