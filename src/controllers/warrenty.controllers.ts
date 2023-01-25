import { body } from 'express-validator';
import { WarrentyModel } from "../models/warrenty.model";
import { Fmsg } from "../utils/helper";
import { Request,Response,NextFunction } from "express";


export async function GetAllWarrentyController(req: Request, res: Response, next:NextFunction) {
    let result = await WarrentyModel.find(); 

    if (result) {
        return Fmsg(res,"Here is all of your warrenty",result)
    }
}


export async function CreateWarrentyController(req: Request, res: Response, next:NextFunction) {
    let warrName = await WarrentyModel.findOne({ name: req.body.name });
    
    if (warrName) {
        return res.status(400).send({con:false,msg:"Warrenty name is already existed"})
    } else {

        req.body.remark = req.body.remark.split(',');
        let result = await WarrentyModel.create(req.body);

        return Fmsg(res, "Your Warrenty is successfully saved", result);
    }


}


export async function GetOneWarrentyController(req: Request, res: Response, next: NextFunction) {
    let isWarrenty = await WarrentyModel.findById(req.params.warrId);

    if (isWarrenty) {
        return Fmsg(res,"Here is one of your data",isWarrenty)
    } else {
        return res.status(400).send("Warrenty with that id is not found")
    }
}

export async function DeleteWarrentyController(req: Request, res: Response, next: NextFunction) {
    let isWarrenty = await WarrentyModel.findById(req.params.warrId);

    if (isWarrenty) {
        let result = await WarrentyModel.findByIdAndDelete(isWarrenty._id).select('-__v');

        if (result) {
            return Fmsg(res, "Your warrenty is delete",result);
      }
    } else {
        return res.status(400).send("Warrenty with that id is not found")
    }
}

export async function UpdateWarrentyController(req: Request, res: Response, next: NextFunction) {
     let isWarrenty = await WarrentyModel.findById(req.params.warrId);

    if (isWarrenty) {
        let result = await WarrentyModel.findByIdAndUpdate(isWarrenty._id,req.body).select('-__v');
        
        result = await WarrentyModel.findById(result?._id);
        
        if (result) {
            return Fmsg(res, "Your warrenty is delete",result);
      }
    } else {
        return res.status(400).send("Warrenty with that id is not found")
    }
}