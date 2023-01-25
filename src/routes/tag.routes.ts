import { CreateTagSchema, DeleteTagSchema, GetOneTagSchema } from './../schema/Tags.schema';
import { ValidateResource } from './../middlewares/valideResource';
import {Express} from 'express';
import {DeleteOneTagsController, GetAllTagsController, GetOneTagsController, PostTagsController, UpdateOneTagsController } from '../controllers/tags.controllers';
import { SaveSingleFile } from '../utils/gallery';



export function TagsRoute(app:Express) {
    
    //get all tags
    app.get('/tags',GetAllTagsController);
    
    //create Tags
    app.post('/tags',SaveSingleFile,ValidateResource(CreateTagSchema), PostTagsController);

   //get one
    app.get('/tags/:tagId',ValidateResource(GetOneTagSchema),GetOneTagsController)

    //delete one
    app.delete('/tags/:tagId', ValidateResource(DeleteTagSchema), DeleteOneTagsController);

    //update one
    app.patch('/tags/:tagId', SaveSingleFile, UpdateOneTagsController);
    
}