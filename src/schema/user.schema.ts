import { body } from 'express-validator';
import { object,string } from 'zod'



export const UserSchema = object({
    body: object({
        name: string({ required_error: "Name is required" }),
        email: string({ required_error: "Email is required" }).email("Eamil must be valid email!"),
        phone: string({ required_error: "Phone is required" }).min(7, 'Phone number must be min 7').max(11, 'Phone number must be max 11'),
        password: string({ required_error: "Password is required" }).min(8, "Password must be min 8"),
    })
})

export const UserLoginSchema = object({
    body: object({
       phone: string({ required_error: "Phone is required" }).min(7, 'Phone number must be min 7').max(11, 'Phone number must be max 11'),
        password: string({ required_error: "Password is required" }).min(8, "Password must be min 8"),
    })
})

export const UserAddRoleSchema = object({
    body: object({
        userId: string({ required_error: "User Id is required" }).regex(/^[0-9a-fA-F]{24}$/),
        roleId:string({required_error:"Role Id is required"}).regex(/^[0-9a-fA-F]{24}$/)
    })
})

export const UserAddPermitSchema = object({
    body: object({
        userId: string({ required_error: "User Id is required" }).regex(/^[0-9a-fA-F]{24}$/),
        permitId:string({required_error:"PermitId is required"}).regex(/^[0-9a-fA-F]{24}$/)
    })
})