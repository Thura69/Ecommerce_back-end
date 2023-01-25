import { body } from 'express-validator';
import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from 'express'



export const ValidateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params:req.params
        })
        next()
    } catch (error: any) {
        
       
       return res.status(400).send({con:false,msg:error.errors[0].message})
       
    }
}