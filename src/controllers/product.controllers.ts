import { Request, Response, NextFunction } from "express"
import { productModel } from "../models/product.model"
import { Fmsg } from "../utils/helper";


export async function AddProductController(req:Request,res:Response,next:NextFunction) {
    let isName = await productModel.findOne({ name: req.body.name });

    if (isName) {
        return res.status(400).send({con:false,msg:"Product with that name is already existed"})
    } else {


        req.body.features = req.body.features.split(',');
        req.body.delivery = req.body.delivery.split(',');
        req.body.warranty = req.body.warrenty.split(',');
        req.body.colors = req.body.colors.split(',');


        let result = await productModel.create(req.body);

        if (result) {
        return Fmsg(res,"Your Product is successfully saved",result)
        }

    }
}

export async function GetOneProductController(req: Request, res: Response, next: NextFunction) {
    let product = await productModel.findById(req.params.productId);

    if (product) {
        return Fmsg(res, "Here is product that ou found",product);
    } else {
        return res.status(400).send({con:false,msg:"Product with that id is not found sir"})
    }
}

export async function GetAllProductController(req: Request, res: Response, next: NextFunction) {
    let result = await productModel.find();

    if (result) {
        return Fmsg(res,"Here is all of your products",result)
    } else {
        return res.status(400).send({con:false,msg:"No Product found"})
    }
}

export async function DeleteProductController(req: Request, res: Response, next: NextFunction) {
    let isProduct = await productModel.findById(req.params.productId);

    if (isProduct) {
        let result = await productModel.findByIdAndDelete(isProduct._id);

        if (result) {
            return Fmsg(res, 'Your product is successfully dropped', result);
        }
    } else {
        return res.status(400).send({con:false,msg:"Product not found with that Id"})
    }
}

export async function UpateProductController(req: Request, res: Response, next: NextFunction) {
     let isProduct = await productModel.findById(req.params.productId);

    if (isProduct) {
        let result = await productModel.findByIdAndUpdate(isProduct._id, req.body);
        
        result = await productModel.findById(result?._id).select('-__v');

        if (result) {
            return Fmsg(res, 'Your product is successfully dropped', result);
        }
    } else {
        return res.status(400).send({con:false,msg:"Product not found with that Id"})
    }
}