import { DeliveryModel } from "../models/delivery.model";
import { Fmsg } from "../utils/helper";
import {Request,Response,NextFunction} from 'express'


export async function GetAllDeliveryController(req:Request,res:Response,next:NextFunction) {
    let result = await DeliveryModel.find();
    return Fmsg(res, "Here is all of your Delivery", result);
}

export async function PostDeliveryController(req:Request, res:Response, next:NextFunction) {
    let isDelivery = await DeliveryModel.findOne({ name: req.body.name });

    if (isDelivery) {
 
  return res.status(400).send({con:false,msg:"Delivery with that name is already existed"})
        
    } else {
        req.body.remark = req.body.remark.split(',');
        let result = await DeliveryModel.create(req.body);

        return Fmsg(res, "Your delivery is successfully saved", result);
    }
}

export async function GetOneDeliveryController(req: Request, res: Response, next: NextFunction) {
    let result = await DeliveryModel.findById(req.params.deliId);
    if (result) {
        return Fmsg(res, 'Here is thing with that id', result);
    }
}
 

export async function DeleteDeliveryController(req: Request, res: Response, next: NextFunction) {
    let isDelivery = await DeliveryModel.findById(req.params.deliId);

    if (isDelivery) {
        let result = await DeliveryModel.findByIdAndDelete(isDelivery._id);

        if (result) {
            return Fmsg(res,"Your delivery with that id is deleted",result)
      }
    } else {
        return res.status(400).send({ con: false, msg: "Delivery with that id is not found" });
    }
}

export async function UpdateDeliveryController(req: Request, res: Response, next: NextFunction) {
      let isDelivery = await DeliveryModel.findById(req.params.deliId);

    if (isDelivery) {
        let result = await DeliveryModel.findByIdAndUpdate(isDelivery._id, req.body);
        
        result = await DeliveryModel.findById(result?._id);

        if (result) {
            return Fmsg(res,"Your delivery with that id is updated",result)
      }
    } else {
        return res.status(400).send({ con: false, msg: "Delivery with that id is not found" });
    }
}


