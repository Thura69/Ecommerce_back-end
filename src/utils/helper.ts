import { UserDocument } from './../models/user.model';
import { Response } from 'express'
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongoose';

const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();



export async function Fmsg(res:Response,msg="",result:{}) {
    return res.status(200).json({con:true,msg,result})
}

export async function Encoded(password:string) {
    
    let hash = bcrypt.hashSync(password,10);

    return hash

}

export async function SetRedis(id: object, value: object) {
    console.log("I am setRedis")
    return await client.set(id.toString(), JSON.stringify(value));
}
   
export async function GetRedis(id: string) {
    return JSON.parse(await client.get(id.toString()));
}

export async function DropRedis(id: string) {
    return await client.del(id.toString());
}