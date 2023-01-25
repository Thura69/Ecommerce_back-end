import { object, string, number } from 'zod';



export const DeliverySchema = object({
    body: object({
        name: string({ required_error: "Delivery name is required" }),
        price: string({ required_error: "Delivery Price is required" }),
        duration: string({ required_error: "Delivery Duration is required" }),
        image: string({ required_error: "Delivery Image is required" }),
        remark:string({required_error:"Delivery Remark is required"})
    })
})

export const DeliveryParmas = object({
    params: object({
        deliId:string({required_error:"Delivery id is required"})
    })
})