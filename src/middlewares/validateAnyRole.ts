import {Request,Response,NextFunction} from 'express'

export  const ValidateAnyRole =  (roles:string[])=>(req:Request,res:Response,next:NextFunction)=>{
    let bol = false;

    console.log(res.locals.user);

    for (let i = 0; i < roles.length; i++){
        
        let hasRole = res.locals.user.roles.find((ro: any) => {return ro.name === roles[i] });

        console.log("hasRole",hasRole);

        if (hasRole) {
            return next();
            
        } else {
             return res.status(400).send({con:false,msg:"You are not allowed to this part"});
        }
    }
}