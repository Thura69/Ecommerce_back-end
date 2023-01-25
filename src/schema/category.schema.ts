
import {object, string } from 'zod';


const payload = {
    body: object({
        name: string({ required_error: "Name is required" }),
        image: string({ required_error: "Image is required" })
    })
}
    


const params = {
     params: object({
       catId:string({required_error:"CatId is required"}).regex(/^[0-9a-fA-F]{24}$/)
    })
}


export const CreateCategorySchema = object({
    ...payload
})

export const GetOneCategorySchema = object({
    ...params
})

export const DeleteCategorySchema = object({
    ...params
})

export const UpdateCategorySchema = object({
    ...payload,
    ...params
})
