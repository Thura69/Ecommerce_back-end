import RoleModel from "../models/role.model";
import PermitModel from "../models/permit.model";
import {Request,Response,NextFunction} from 'express'
import { FindRole,CreateRole, FindOneRole, FindAllRoles, UpdateRole, DropRole } from "../services/role.service";
import { Fmsg } from "../utils/helper";


export async function addRoleController(req:Request,res:Response,next:NextFunction) {
    let role = await FindRole({ name: req.body.name });

    if (role) {
        return res.status(400).json({con:false,msg:"Role name is already existed!",result:role})
    }
    let result = await CreateRole(req.body);
    return  Fmsg(res, "Role saved!", result);

}

export async function getAllRoleController(req: Request, res: Response, next: NextFunction) {
    let roles = await FindAllRoles();
    return Fmsg(res, "Here is all of your roles", roles);
}

export async function getOneRoleController(req: Request, res: Response, next: NextFunction) {
    let role = await FindOneRole(req.params.roleId);
     if (!role) {
    return res.status(400).send({con:false,msg:"No Role with that Id"})
     }
    return  Fmsg(res, "Your Role", role); 
}

export async function UpdateRoleController(req: Request, res: Response, next: NextFunction) {
    let role = await FindOneRole(req.params.roleId);
    console.log("Role",role)
     if (!role) {
    return res.status(400).send({con:false,msg:"No Role with that Id"})
     }
    
    let result = await UpdateRole(role._id, req.body);
    
    if(result) return  Fmsg(res, "Your Permit", result); 
    
}
export async function dropRoleController(req: Request, res: Response, next: NextFunction) {
     let role = await FindOneRole(req.params.roleId);

     if (!role) {
    return res.status(400).send({con:false,msg:"No Role with that Id"})
     }
    let result = await DropRole(role._id);
    
     if (result)return Fmsg(res, "Your role is dropped", result);
}

export async function PermitAddToRoleController(req:Request, res:Response, next:NextFunction) {
    let dbRole = await RoleModel.findById(req.body.roleId);
    let dbPermit = await PermitModel.findById(req.body.permitId);

    if (dbRole && dbPermit) {
        await RoleModel.findByIdAndUpdate(dbRole._id, { $push: { permits: dbPermit._id } }).select('-__v');

        let result =  await RoleModel.findById(dbRole._id).populate("permits");
        
        if(result) return Fmsg(res,"Your Permit is added to the role",result)
    } else {
         return res.status(400).send({con:false,msg:"Role Id and Permit Id need to be valided"}) 
    }

}

export async function RoleRemovePermit(req:Request, res:Response, next:NextFunction) { 
    let dbRole = await RoleModel.findById(req.body.roleId);
    let dbPermit = await PermitModel.findById(req.body.permitId);

    if (dbRole && dbPermit) { 
         await RoleModel.findByIdAndUpdate(dbRole._id, { $pull: { permits: dbPermit._id } }).select('-__v')
        
         let result =  await RoleModel.findById(dbRole._id).populate("permits");


        if(result) return Fmsg(res,"Your Permit is Remove from the role",result) 
    } else {
         return res.status(400).send({con:false,msg:"Role Id and Permit Id need to be valided"}) 
    }

}


