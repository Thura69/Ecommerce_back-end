import { object, string, TypeOf } from 'zod';


const payload = {
    body: object({
    name:string({required_error:"Child Category Name is required"}),
        image: string({ required_error: "Child Category Image is required" }),
    subcatId:string({required_error:"Sub Category is required"}).regex(/^[0-9a-fA-F]{24}$/)   
})
}

const params = {
    params: object({
     childId:string({required_error:"Child Category ID is required"}).regex(/^[0-9a-fA-F]{24}$/)   
    })
}


export const CreateChildCat = object({
    ...payload
})

export const GetOneChildCat = object({
    ...params
})

export const DeleteChildCat = object({
    ...params
})

export const UpdateChildCat = object({
    ...payload,
    ...params
})