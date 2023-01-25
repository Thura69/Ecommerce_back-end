import { productModel } from './../models/product.model';
import { OrderModel } from "../models/order.model";
import { OrderItemsModel } from "../models/orderItems.model";
import { Fmsg } from '../utils/helper';
import {Request,Response,NextFunction} from 'express'

export async function OrderAddController(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;
    const items = req.body.items;

    let saveOrder:any = new OrderModel();
    let orderItemsObj: any = [];
    let total = 0;

    for await (let item of items) {
        let product = await productModel.findById(item.id);

        let obj = {
            order: saveOrder._id,
            count: item.count,
            productId: product?._id,
            name: product?.name,
            price: product?.price

        }
        orderItemsObj.push(obj)

        total += Number(product?.price) * Number(item.count);
    }

    let orderItemResult = await OrderItemsModel.insertMany(orderItemsObj);
  
    let orderItemids = orderItemResult.map(item => item._id);

    saveOrder.user = user;
    saveOrder.items = orderItemids;
    saveOrder.count = items.length;
    saveOrder.total = total;

    let result = await saveOrder.save();
    result = await OrderModel.findById(result._id).populate('user');


    return Fmsg(res, "Your Order is accepted", result);

}


export async function getOneOrderController(req: Request, res: Response, next: NextFunction) {
    let result = await OrderModel.findById(req.params.orderId).populate('items');

    if (result) {
        return Fmsg(res,"Here is one of your Order",result)
    } else {
        return res.status(404).send({con:false,msg:"Order with that id is not found sir"})
    }
}