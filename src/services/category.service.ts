import { Query } from 'mongoose';
import { body } from 'express-validator';
import { CategoryModel } from './../models/category.model';



export async function FindCategory(query: object) {
    return await CategoryModel.findOne(query);
}

export async function SaveCategory(body: Object) {
    return await CategoryModel.create(body);
}

export async function IsCategory(qurey: string) {
    
    return await CategoryModel.findById(qurey);
    
}

export async function DeleteCategory(qurey: string) {
    return await CategoryModel.findByIdAndDelete(qurey);
}

export async function UpdateCategory(id: string, query: object) {
    return await CategoryModel.findByIdAndUpdate(id, query);
}