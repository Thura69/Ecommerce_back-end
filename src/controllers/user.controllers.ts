import { UserModel } from './../models/user.model';
import { Request, Response, NextFunction } from "express";
import {FindUserWithQuery, UserSave } from "../services/user.service";
import { Fmsg, SetRedis } from '../utils/helper';
import { Encoded } from '../utils/helper';
import { SignToken } from '../utils/jwt';
import RoleModel from '../models/role.model';
import PermitModel from '../models/permit.model';


export async function Register(req:Request,res:Response,next:NextFunction) {
    let dbEmailUser = await FindUserWithQuery({ email: req.body.email });
    if (dbEmailUser) {
        return res.status(400).send({ con: false, msg: "Email is already existed" });
    }

    let dbPhoneUser = await FindUserWithQuery({ phone: req.body.phone });
    if (dbPhoneUser) {
        return res.status(400).send({ con: false, msg: "Phone Number is already existed" });
    }



    let result = await UserSave(req.body);



    return Fmsg(res, "Register is success", result);

}

export async function Login(req: Request, res: Response, next: NextFunction) {
    let user = await FindUserWithQuery({ phone: req.body.phone });
    if (user) {
   
        let isValid = await user.comparePassword(req.body.password);
        
        if (!isValid) return res.status(400).send({ con: false, msg: "User password is wrong" });

        let result = user.toObject();
        delete result.password;

        result.token = await SignToken(result);

        if (result._id) {
            SetRedis(result._id, result);
        }

        Fmsg(res, "Login is success", result);


 
        
    } else {
        return res.status(400).send({ con: false, msg: "User with that phone number is not here, Please Register" });
    }
}

export async function UserAddRole(req: Request, res: Response, next: NextFunction) {

    let user = await UserModel.findById(req.body.userId).populate('roles').select('-__v');
    if (!user) return res.status(400).send({ con: false, msg: "User with that id is not found" })
    
    
    let role = await RoleModel.findById(req.body.roleId).select('-__v');

    if (!role) return res.status(400).send({ con: false, msg: "Role with that id is not found" })
    
    if (role && user) {
        let isRole = user.roles.find((ro: any) => (ro.name === role?.name));
        
        if (isRole) return res.status(400).send({ con: false, msg: "This User Role is already existed",result:role});
        
        let result = await UserModel.findByIdAndUpdate(user._id, { $push: { roles: role._id } }).populate('roles');

        result = await UserModel.findById(result?._id).populate('roles');

        if (result) {
            return Fmsg(res, "Your Role is successfully added", result);
      }
    }

   

}

export async function UserRemoveRole(req: Request, res: Response, next: NextFunction) {

    let user = await UserModel.findById(req.body.userId).populate('roles').select('-__v');
    if (!user) return res.status(400).send({ con: false, msg: "User with that id is not found" })
    
    
    let role = await RoleModel.findById(req.body.roleId).select('-__v');

    if (!role) return res.status(400).send({ con: false, msg: "Role with that id is not found" })
    
    if (role && user) {
        
        let result = await UserModel.findByIdAndUpdate(user._id, { $pull: { roles: role._id } }).populate('roles');

        result = await UserModel.findById(result?._id).populate('roles');

        if (result) {
            return Fmsg(res, "Your Role is successfully removed", result);
      }
    }
}

export async function UserAddPermit(req: Request, res: Response, next: NextFunction) {
     let user = await UserModel.findById(req.body.userId).populate('permits roles').select('-__v');
    if (!user) return res.status(400).send({ con: false, msg: "User with that id is not found" })
    
    
    let permit = await PermitModel.findById(req.body.permitId).select('-__v');

    if (!permit) return res.status(400).send({ con: false, msg: "Role with that id is not found" })
    
   

    if (permit && user) {
        let isPermit = user.permits.find((per: any) => (per.name === permit?.name));
        
        if (isPermit) { 
            return res.status(400).send({ con: false, msg: "This User Permit is already existed",result:permit});
        }

        let result = await UserModel.findByIdAndUpdate(user._id, { $push: { permits: permit._id } }).populate('permits');

        result = await UserModel.findById(result?._id).populate('permits roles');

        if (result) {
            return Fmsg(res, "Your Permit is successfully added", result);
      }
    }

}

export async function UserRemovePermit(req: Request, res: Response, next: NextFunction) {
      let user = await UserModel.findById(req.body.userId).populate('permits roles').select('-__v');
    if (!user) return res.status(400).send({ con: false, msg: "User with that id is not found" })
    
    
    let permit = await PermitModel.findById(req.body.permitId).select('-__v');

    if (!permit) return res.status(400).send({ con: false, msg: "Role with that id is not found" })
    
   

    if (permit && user) {

        let result = await UserModel.findByIdAndUpdate(user._id, { $pull: { permits: permit._id } }).populate('permits');

        result = await UserModel.findById(result?._id).populate('permits roles');

        if (result) {
            return Fmsg(res, "Your Permit is successfully removed", result);
      }
    }
}