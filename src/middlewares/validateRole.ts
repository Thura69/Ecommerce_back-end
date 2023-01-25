import { Request,Response,NextFunction } from "express"


export const ValidateRole =  (role: string) => (req:Request, res:Response, next:NextFunction) => {
    
    let foundRole = res.locals.user.roles.find((ro:any) => (ro.name === role));
     
    if (!foundRole) return res.status(400).send({ con: false, msg: "Your are not allowed" })
    
   return next();
   

}