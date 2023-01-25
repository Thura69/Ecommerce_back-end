import { CategoryModel } from './../models/category.model';
import { Request, Response, NextFunction } from 'express';
import { DeleteCategory, FindCategory, IsCategory, SaveCategory, UpdateCategory } from '../services/category.service';
import { Fmsg } from '../utils/helper';


export async function CategoryAddController(req: Request, res: Response, next: NextFunction) {
  
    let findCategory = await FindCategory({ name: req.body.name });
    
    if (findCategory) {
        return res.status(400).send({ con: false, msg: "Category name is already existed" });
    }

    let result = await SaveCategory(req.body);

    if (result) {
        return Fmsg(res, "Your category is saved", result);
    }
    
}

export async function CategoryGetAllController(req:Request, res:Response, next:NextFunction) {
    let result = await CategoryModel.find().populate({
        path: "subcats",
        populate: {
            path: "childCats",
            model:"ChildCat"
        }
    });
  
    return Fmsg(res, "Here is all of your categories", result);

}

export async function CategoryGetOneController(req: Request, res: Response, next: NextFunction) {
    
    let isCategory = await IsCategory(req.params.catId);

    if (isCategory) {
         return Fmsg(res,'Here is one of your categories',isCategory)
    } else {
        return res.status(404).send({con:false,msg:"Your category is not found"})
     }
}

export async function CategoryDeleteController(req: Request, res: Response, next: NextFunction) {
    
    let isCategory = await IsCategory(req.params.catId);

    if (isCategory) {
       
        let result = await DeleteCategory(isCategory._id);

        if (result) {
            return Fmsg(res, "Your category is now deleted", result);
      }


    } else {
        return res.status(404).send({con:false,msg:"Your category is not found"})
     }
    
}

export async function CategoryUpdateController(req: Request, res: Response, next: NextFunction) {
    
     let isCategory = await IsCategory(req.params.catId);

    if (isCategory) {
       
        let result = await UpdateCategory(req.params.catId,req.body);;
            result = await CategoryModel.findById(req.params.catId)

        if (result) {
            return Fmsg(res, "Your category is now updated", result);
      }


    } else {
        return res.status(404).send({con:false,msg:"Your category is not found"})
     }
    

}