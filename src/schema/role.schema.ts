import { object, string } from 'zod';

const payload = {
    body: object({
        name: string({ required_error: 'Name is required' })
    })
}

const params = {
    params: object({
        roleId: string({ required_error:"Role Id is required"}).regex(/^[0-9a-fA-F]{24}$/)
    })
}

export const CreateRole = object({
    ...payload
})

export const GetOneRole = object({
    ...params
})

export const GetOneAndUpdateRole = object({
    ...payload,
    ...params
})

export const DeleteRole = object({
    ...params
})

//permit add to the role

export const PermitAddToRole = object({
    body: object({
        roleId: string({ required_error: "Role Id is required" }).regex(/^[0-9a-fA-F]{24}$/),
        permitId:string({required_error:"Permit Id is required"}).regex(/^[0-9a-fA-F]{24}$/)
    })
})
