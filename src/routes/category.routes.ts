import { CreateCategorySchema, DeleteCategorySchema, GetOneCategorySchema, UpdateCategorySchema } from './../schema/category.schema';
import { ValidateResource } from './../middlewares/valideResource';
import {Express} from 'express'
import { CategoryAddController, CategoryDeleteController, CategoryGetAllController, CategoryGetOneController, CategoryUpdateController } from '../controllers/category.controllers';
import { SaveSingleFile } from '../utils/gallery';
import { ValidateToken } from '../middlewares/validateToken';


export function CategoryRoutes(app:Express) {
    
    //category add
    app.post('/categories',ValidateToken,SaveSingleFile,ValidateResource(CreateCategorySchema), CategoryAddController);
    
    //category all
    app.get('/categories',ValidateToken, CategoryGetAllController);
    
    //category one
    app.get('/categories/:catId',ValidateToken, ValidateResource(GetOneCategorySchema),CategoryGetOneController);

    //delete one
    app.delete('/categories/:catId',ValidateToken,ValidateResource(DeleteCategorySchema), CategoryDeleteController);

    //update one
    app.post('/categories/:catId',ValidateToken,SaveSingleFile,ValidateResource(UpdateCategorySchema), CategoryUpdateController);

}