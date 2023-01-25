import { WarrentySchema, WarrentyParams } from './../schema/warrenty.schema';
import { ValidateResource } from './../middlewares/valideResource';
import {Express} from 'express'
import { GetAllWarrentyController,CreateWarrentyController, GetOneWarrentyController, DeleteWarrentyController, UpdateWarrentyController } from '../controllers/warrenty.controllers'
import { SaveSingleFile } from '../utils/gallery';


export function WarrentyRoutes(app: Express) {
    
    //getAll
    app.get('/warrenties', GetAllWarrentyController);

    //post warrenty
    app.post('/warrenties', SaveSingleFile, ValidateResource(WarrentySchema), CreateWarrentyController);
    
    //get one
    app.get('/warrenties/:warrId', ValidateResource(WarrentyParams), GetOneWarrentyController);

    //delete 
    app.delete('/warrenties/:warrId', ValidateResource(WarrentyParams), DeleteWarrentyController);

    //update
    app.patch('/warrenties/:warrId', ValidateResource(WarrentyParams), UpdateWarrentyController);
     
}