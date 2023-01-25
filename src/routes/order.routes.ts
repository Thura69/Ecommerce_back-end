

import { ValidateResource } from './../middlewares/valideResource';
import { Express } from 'express';
import { getOneOrderController, OrderAddController } from '../controllers/orderItem.controllers';
import { ValidateToken } from '../middlewares/validateToken';
import { OrderParams, OrderSchema } from '../schema/order.schema';



export function OrderRoute(app:Express) {

    app.post('/orders',ValidateToken,OrderAddController)
    
    //get one order
    app.get('/orders/:orderId',ValidateResource(OrderParams),getOneOrderController)

}