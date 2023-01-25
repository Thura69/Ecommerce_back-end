import {object,string} from 'zod';


const payload = {
    body: object({
        name:string({required_error:"Name is required"})
    })
}

const params = {
    params: object({
        permitId: string({ required_error: "Permit Error is required" }).regex(/^[0-9a-fA-F]{24}$/)
    })
}





export const createPermitSchema = object({
    ...payload
});

export const getOnePermitSchema = object({
    ...params
})

export const deletePermitSchema = object({
    ...params
})

export const getAndUpdateSchema = object({
    ...payload,...params
})
