import { ValidateResource } from './../middlewares/valideResource';
import { CreateChildCat, DeleteChildCat, GetOneChildCat, UpdateChildCat } from './../schema/childcat.shema';
import {Express} from 'express'
import { CreateChildCatController, DeleteChildController, GetAllChildCatConroller, GetOneChildController, UpdateChildController } from '../controllers/childCat.controllers'
import { SaveSingleFile } from '../utils/gallery';


export function ChildCatRoute(app:Express) {
    

    //get all childCats
    app.get('/childCats', GetAllChildCatConroller);

    //create childCats
    app.post('/childCats',SaveSingleFile,ValidateResource(CreateChildCat), CreateChildCatController);


    //getOne ChildCats
    app.get('/childCats/:childId', ValidateResource(GetOneChildCat), GetOneChildController)
    
    //deleteChildController

    app.delete('/childCats/:childId', ValidateResource(DeleteChildCat),
    DeleteChildController
    )

    //updateChildController
    app.patch('/childCats/:childId',UpdateChildController);
}