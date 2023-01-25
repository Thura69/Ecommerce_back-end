import { object, string } from 'zod'



export const OrderSchema = object({
    body: object({
    items:string({required_error:"Items is required"}).array()
    })
})


export const OrderParams = object({
    params: object({
       orderId:string({required_error:"CatId is required"}).regex(/^[0-9a-fA-F]{24}$/)
    })
})

