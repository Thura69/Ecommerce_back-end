import { SubCatModel } from './../models/subcat.model';
import { ChildCatModel } from './../models/childcat.model';
import { Fmsg } from '../utils/helper';
import {Response,Request,NextFunction} from 'express'

export async function GetAllChildCatConroller(req:Request,res:Response,next:NextFunction) {
    let result =await ChildCatModel.find();


    return Fmsg(res, "Here is all of your ChildCatModel", result);
}

export async function CreateChildCatController(req: Request, res: Response, next: NextFunction) {
    let isChildCat = await ChildCatModel.findOne({ name: req.body.name });

    if (isChildCat) {
        return res.status(400).send({ con: false, msg: "This child category name is already existed" });
    } else {
        
        let isSub = await SubCatModel.findById(req.body.subcatId);

        if (isSub) {
            
            let result = await ChildCatModel.create(req.body);
            await SubCatModel.findByIdAndUpdate(isSub._id, {
                $push: {
                    childCats: result._id
            }})
            Fmsg(res, "This Child Category is successfully created", result);
            
        } else {
            return res.status(400).send({ con: false, msg: "Sub Category with that Id is not found sir" });
        }


     
    }

}

export async function GetOneChildController(req: Request, res: Response, next: NextFunction) {
    let result = await ChildCatModel.findById(req.params.childId);

    if (result) {
        return Fmsg(res, "Here is one of your Child Categories", result);
    } else {
        return res.status(400).send({ con: false, msg:"Child Category with that id not found "})
    }
}

export async function DeleteChildController(req: Request, res: Response, next: NextFunction) {
    let isChild = await ChildCatModel.findById(req.params.childId);

    if (isChild) {
        let result = await ChildCatModel.findByIdAndDelete(req.params.childId,);

          await SubCatModel.findByIdAndUpdate(req.body.subcatId, {
                $pull: {
                    childCats: isChild._id
            }})

        if (result) {
            return Fmsg(res,"Your childCat is dropped",result)
       }
    } else {
        return res.status(400).send({ con: false,msg:"Child Category with that Id is not found sir"})
    }
}

export async function UpdateChildController(req: Request, res: Response, next: NextFunction) {
    let isChild = await ChildCatModel.findById(req.params.childId);

    if (isChild) {
        await ChildCatModel.findByIdAndUpdate(isChild._id, req.body);
        let result = await ChildCatModel.findById(isChild._id);

        if (result) {
            Fmsg(res, "Your Child Category is updated", result);
       }
    } else {
        return res.status(400).send({con:false,msg:"Child Category with that id is not found "})
    }
}