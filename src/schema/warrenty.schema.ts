import { object,string } from 'zod'




export const WarrentySchema = object({
    body: object({
        name: string({ required_error: "Warrenty name is required" }),
        image: string({ required_error: "Warrenty image is required" }),
        remark: string({ required_error: "remark is required" }) 
    })
})

export const WarrentyParams = object({
    params: object({
        warrId:string({required_error:"Warrenty Id is required"})
    })
})