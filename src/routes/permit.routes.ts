import { createPermitSchema, getOnePermitSchema, getAndUpdateSchema, deletePermitSchema } from './../schema/permit.schema';

import {Express} from 'express'
import { AddPermitController, DeletePermitController, GetAllPermitController, GetOnePermitController, UpdatePermitController } from '../controllers/permit.controllers'
import { ValidateResource } from '../middlewares/valideResource';
import { ValidateToken } from '../middlewares/validateToken';




export async function PermitRoute(app: Express) {
    //post permits
    app.post('/permits', ValidateToken, ValidateResource(createPermitSchema), AddPermitController);
    
    //get all permits
    app.get('/permits',ValidateToken,GetAllPermitController);
    
    //get one permit
    app.get('/permits/:permitId', ValidateToken, ValidateResource(getOnePermitSchema), GetOnePermitController);
    
    //update one permit
    app.post('/permits/:permitId',ValidateToken,ValidateResource(getAndUpdateSchema), UpdatePermitController);

    //delete one permit
    app.delete('/permits/:permitId',ValidateToken,ValidateResource(deletePermitSchema),DeletePermitController)
}