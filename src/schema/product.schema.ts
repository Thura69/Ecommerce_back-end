import { boolean } from 'zod';
import { array, number } from 'zod';
import { object, string } from 'zod';
import { z } from 'zod';

export const ProductSchema = object({
    body: object({
       name:string({required_error:"Name is required"}),
    price:string({required_error:"Price is required"}),
    brand:string({required_error:"Brand is required"}),
    cat: string({required_error:"Categroy is required"}),
    subCat:string({required_error:"Sub Category is required"}),
    childCat:string({required_error:"Child Category is required"}),
    tag:string({required_error:"Tag is required"}),
    discount: string({required_error:"Discound is required"}),
    features: string({required_error:"Features is requried"}),
    description: string({required_error:"Description is required"}),
    warrenty: string({required_error:"Warrenty is required"}),
    colors: string({required_error:"colors is required"}),
    size: string({required_error:"Size is required"}),
    rating: string({required_error:"Rating is required"}),
    images: string({required_error:"Image is required"}).array(),
    })
});

export const ProductId = object({
    params : object({
    productId:string({required_error:"Product Id is required"})    
    })
})