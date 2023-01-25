import { object, string } from 'zod';



export const AllSchema = object({
   params: object({
        permitId: string({ required_error: "PermitId is required" }).regex(/^[0-9a-fA-F]{24}$/)
    })
})