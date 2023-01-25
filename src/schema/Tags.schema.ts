import { object, string } from 'zod';





const payload = {
    body: object({
        name: string({ required_error: "Name is required" }),
        image: string({ required_error: "Image is required" })
    })
}
    


const params = {
     params: object({
       tagId:string({required_error:"CatId is required"}).regex(/^[0-9a-fA-F]{24}$/)
    })
}


export const CreateTagSchema = object({
    ...payload
})

export const GetOneTagSchema = object({
    ...params
})

export const DeleteTagSchema = object({
    ...params
})

export const UpdateTagSchems = object({
    ...payload,
    ...params
})
