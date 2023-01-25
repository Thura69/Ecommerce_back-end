import { ProductId } from './../schema/product.schema';
import { Express } from 'express';
import { AddProductController, DeleteProductController, GetAllProductController, GetOneProductController, UpateProductController } from '../controllers/product.controllers';
import { ValidateResource } from '../middlewares/valideResource';
import { ProductSchema } from '../schema/product.schema';
import { saveMultipleFile } from '../utils/gallery';


export function ProductRoutes(app: Express) {
    
    //post products
    app.post("/products", saveMultipleFile, ValidateResource(ProductSchema), AddProductController);

    //get one products
    app.get('/products/:productId', ValidateResource(ProductId), GetOneProductController);

    //get all products
    app.get('/products', GetAllProductController);

    //delete product
    app.delete('/products/:productId', ValidateResource(ProductId), DeleteProductController);

    //update product
    app.patch('/products/:productId',saveMultipleFile,UpateProductController)
}

