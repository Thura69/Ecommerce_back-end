import {Request,Response,NextFunction} from 'express'

export  const ValidateAnyPermit =  (roles:string[])=>(req:Request,res:Response,next:NextFunction)=>{
    let bol = false;

    console.log(res.locals.user);

    for (let i = 0; i < roles.length; i++){
        
        let hasPermit = res.locals.user.permits.find((ro: any) => {return ro.name === roles[i] });

        if (hasPermit) {
            
            return next();
            
        } else {
             return res.status(400).send({con:false,msg:"You are not allowed to this part"});
        }
    }
}

