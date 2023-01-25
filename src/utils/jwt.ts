import jwt, { JwtPayload } from 'jsonwebtoken';
import config from 'config';


const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');
const accessTokenTtl = config.get<string>("accessTokenTtl");
const refreshTokenTtl = config.get<string>("refreshTokenTtl");


export async function SignToken(payload: JwtPayload,) {
    
    return  jwt.sign(payload, privateKey, { expiresIn: accessTokenTtl ,algorithm:"RS256"});
    
}

export function verifyJwt(token: string) {
    try{
        const decoded = jwt.verify(token, publicKey);        
        return {
            valid: false,
            expired: false,
            decoded:decoded
        }
    } catch (e: any) {
        
        return {
            valid: false,
            expired: true,
            decoded: null
        }
    }
}