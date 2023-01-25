import { ValidateResource } from './../middlewares/valideResource';
import { Express } from 'express'
import { CreateSub, DropSub, GetAllSub, GetOneSub, UpdateSub } from '../controllers/subCat.controllers'
import { SaveSingleFile } from '../utils/gallery';


export function SubCatRoute(app:Express) {
    
    //get all subcat
    app.get('/subcats', GetAllSub);

    //save all subcat
    app.post('/subcats', SaveSingleFile, CreateSub);
    
    //drop subcat
    app.delete('/subcats/:subId', DropSub);

    //get one subcat
    app.get('/subcats/:subId', GetOneSub);

    //update subcat
    app.patch('/subcats/:subId',SaveSingleFile, UpdateSub);
}