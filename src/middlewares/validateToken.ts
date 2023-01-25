import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { verifyJwt } from '../utils/jwt';
import { GetRedis } from '../utils/helper';

const publicKey = config.get<string>('publicKey'); 

export async function ValidateToken(req: Request, res:Response,next:NextFunction) {
    let token = req.headers.authorization;
  
    if (token) {
        token = token.split(' ')[1];
        
        let { decoded } = verifyJwt(token);
        
        if (decoded) {
            if (typeof (decoded) === 'object') {
           
                let result =await GetRedis(decoded._id);
                
                if (result) {
                    res.locals.user = result;

               return next();
                } else {
                   return res.status(400).send({con:false,msg:"Tokenization Error"})  
               }
       }
        } else {
           return res.status(400).send({con:false,msg:"Tokenization Error"})   
       }
       
    } else {
        return res.status(400).send({con:false,msg:"Forbbien"})
     }

}