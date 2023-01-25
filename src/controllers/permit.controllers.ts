import PermitModel from "../models/permit.model";
import { Request, Response, NextFunction, response } from 'express';
import { DeletePermit, FindPermit,GetAllPermit,GetOnePermit,SavePermit, UpdatePermit } from "../services/permit.service";
import { Fmsg } from "../utils/helper";

export async  function AddPermitController(req: Request, res: Response, next: NextFunction) {
    
    let dbPermit = await FindPermit({name:req.body.name})
    

     
    if (dbPermit) {
      return   res.status(400).send({con:false,msg:"User name is already existed!",result:dbPermit})
    }
    let result = await SavePermit(req.body);

    Fmsg(res, "Permission saved!", result);
}

export async function GetAllPermitController(req: Request, res: Response, next: NextFunction) {
    let permit = await GetAllPermit();

    if (!permit) {
    return  res.status(400).send({con:false,msg:"No Permit",result:permit})
    }
   return   Fmsg(res,"All Permissions",permit) 


}

export async function GetOnePermitController(req: Request, res: Response, next: NextFunction) {

    let permit = await GetOnePermit(req.params.permitId);

    if (!permit) {
    return res.status(400).send({con:false,msg:"No Permit with that Id"})
    }
    return  Fmsg(res, "Your Permit", permit);  
}

export async function UpdatePermitController(req: Request, res: Response, next: NextFunction) {
     let permit = await GetOnePermit(req.params.permitId);

    if (!permit) {
    return res.status(400).send({con:false,msg:"No Permit with that Id"})
    }
    
    let result = await UpdatePermit(permit._id, req.body);
    
    if(result) return  Fmsg(res, "Your Permit", result); 

}

export async function DeletePermitController(req: Request, res: Response, next: NextFunction) {
     let permit = await GetOnePermit(req.params.permitId);

    if (!permit) {
    return res.status(400).send({con:false,msg:"No Permit with that Id"})
    }

    let result = await DeletePermit(permit._id);

    if(result) return  Fmsg(res, "Your Permit is deleted", result); 
}