import { SubCatModel } from './../models/subcat.model';
import { CategoryModel } from './../models/category.model';

import {Request,Response,NextFunction} from 'express'
import { IsCategory } from '../services/category.service';
import { getAllSubCat, IsSubCat, SaveSubCat } from "../services/subcat.service";
import { Fmsg } from "../utils/helper";


export async  function GetAllSub (req:Request,res:Response,next:NextFunction) {
    let result = await getAllSubCat();
 
    
    if (result) {
        return Fmsg(res, "Here is all of your Sub Categories", result);
    }
 
}

export async function CreateSub(req: Request, res: Response, next: NextFunction) {
    let isSubCat = await IsSubCat(req.body.name);

    if (isSubCat) {
        return res.status(400).send({con:false,msg:"Sub with that name is already existed"})
    } else {

        let isCat = await IsCategory(req.body.catId);


        if (isCat) {
             let result = await SaveSubCat(req.body);


            if (result) {
                await CategoryModel.findByIdAndUpdate(isCat._id, { $push: { subcats: result._id } });
            return Fmsg(res, "Your Sub is saved", result);
          
        }
        } else {
            return res.status(400).send({ con: false, msg: "Category with that id is not found" });
        }
       
    }


}

export async function DropSub(req: Request, res: Response, next: NextFunction) {
    let isSub = await SubCatModel.findById(req.params.subId);

    if (isSub) {
        await CategoryModel.findByIdAndUpdate(isSub.catId, { $pull: { subcats: isSub._id } });
        
        let result = await SubCatModel.findByIdAndDelete(isSub._id);

        if (result) {
            return Fmsg(res, "Your SubCategory is successfully droped", result);
        }

        
    } else {
        return res.status(400).send({con:false,msg:"SubCategory with that id is not found"})
    }
}

export async function GetOneSub(req: Request, res: Response, next: NextFunction) {
     let isSub = await SubCatModel.findById(req.params.subId);

    if (isSub) {
       
            return Fmsg(res, "One of your subCategory is here", isSub);
        

        
    } else {
        return res.status(400).send({con:false,msg:"SubCategory with that id is not found"})
    }
}


export async function UpdateSub(req: Request, res: Response, next: NextFunction) {
    let isSub = await SubCatModel.findById(req.params.subId);

    if (isSub) {
        await SubCatModel.findByIdAndUpdate(req.params.subId, req.body);
        let result = await SubCatModel.findById(isSub._id);

        if (result) {
            return Fmsg(res, "SubCategory is updated", result);
        }
        
    } else {
        return res.status(400).send({ con: false, msg: "SubCat with that Id is not found" });
    }
}