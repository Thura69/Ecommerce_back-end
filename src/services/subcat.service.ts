import { CategoryModel } from './../models/category.model';
import { SubCatModel } from "../models/subcat.model";


export async function getAllSubCat() {
    let result = await SubCatModel.find().populate('childCats');
    return result;
}

export async function IsSubCat(query:string) {
    return await SubCatModel.findOne({ name: query });
    
}
export async function SaveSubCat(query: object) {
    return    await SubCatModel.create(query);
    
}

