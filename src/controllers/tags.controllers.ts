import { TagsModel } from "../models/tags.model";
import { Fmsg } from "../utils/helper";
import {Request,Response,NextFunction} from 'express'


export async function GetAllTagsController(req:Request,res:Response,next:NextFunction) {
    let result = await TagsModel.find();

    if (result) {
        return Fmsg(res, "Here is all of your Tags", result);
    }
}

export async function PostTagsController(req: Request, res: Response, next: NextFunction) {
    let isTag = await TagsModel.findOne({ name: req.body.name });

    if (isTag) {
        return res.status(400).send({con:false,msg:"Tags with that name is already existed"})
    } else {
        let result = await TagsModel.create(req.body);
        if (result) {
            return Fmsg(res, 'Your tag is successfully saved', result);

        }
    }

}

export async function GetOneTagsController(req: Request, res: Response, next: NextFunction) {
    let result = await TagsModel.findById(req.params.tagId);

    if (result) {
        return Fmsg(res, "This is what you found exactly", result);    
    } else {
        return res.status(400).send({con:false,msg:"Tag with that id is not found"})
    }
}

export async function DeleteOneTagsController(req: Request, res: Response, next: NextFunction) {
    let isTag = await TagsModel.findById(req.params.tagId);

    if (isTag) {
        
        let result = await TagsModel.findByIdAndDelete(isTag._id).select('-__v');

        if (result) {
            return Fmsg(res, "Your Tag is successfully deleted", result);
       }
           
    } else {
        return res.status(400).send({con:false,msg:"Tag with that id is not found"})
    }
}

export async function UpdateOneTagsController(req: Request, res: Response, next: NextFunction) {
      let isTag = await TagsModel.findById(req.params.tagId);

    if (isTag) {
        
        let result = await TagsModel.findByIdAndUpdate(isTag._id, req.body).select('-__v');
        
        result = await TagsModel.findById(result?._id).select('-__v');
    
        if (result) {
            return Fmsg(res, "Your Tag is successfully updated", result);
       }
           
    } else {
        return res.status(400).send({con:false,msg:"Tag with that id is not found"})
    }
}