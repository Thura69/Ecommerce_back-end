import { DeliverySchema, DeliveryParmas } from './../schema/delivery.schema';
import { ValidateResource } from './../middlewares/valideResource';
import {Express} from 'express'
import { DeleteDeliveryController, GetAllDeliveryController, GetOneDeliveryController, PostDeliveryController, UpdateDeliveryController } from '../controllers/delivery.controllers'
import { SaveSingleFile } from '../utils/gallery';


export function DeliveryRoute(app:Express) {
    
    //get all delivery
    app.get('/deliveries', GetAllDeliveryController);

    //post delivery
    app.post('/deliveries', SaveSingleFile, ValidateResource(DeliverySchema), PostDeliveryController)
    
    //get one delivery
    app.get('/deliveries/:deliId', ValidateResource(DeliveryParmas), GetOneDeliveryController);

    //drop one delivery
    app.delete('/deliveries/:deliId', ValidateResource(DeliveryParmas), DeleteDeliveryController)
    
    //update delivery
     app.patch('/deliveries/:deliId', ValidateResource(DeliveryParmas), UpdateDeliveryController)
    

}