import { UserAddRoleSchema, UserAddPermitSchema } from './../schema/user.schema';
import { Express } from 'express';
import { Login, Register, UserAddPermit, UserAddRole, UserRemovePermit, UserRemoveRole } from '../controllers/user.controllers';
import { UserLoginSchema, UserSchema } from '../schema/user.schema';
import { ValidateResource } from '../middlewares/valideResource';
import { ValidateRole } from '../middlewares/validateRole';
import { ValidateToken } from '../middlewares/validateToken';

export async function UserRoutes(app:Express) {
    

    app.post('/users/register', ValidateResource(UserSchema), Register);
    app.post('/users/login',ValidateResource(UserLoginSchema),Login);
   

    //Owner add role
    app.post('/users/add/roles', ValidateToken, ValidateRole('owner'), ValidateResource(UserAddRoleSchema), UserAddRole);
    //Owner remove role
    app.post('/users/remove/roles', ValidateToken, ValidateRole('owner'),
        ValidateResource(UserAddRoleSchema), UserRemoveRole);
    
    //Owner add permit
    app.post('/users/add/permits', ValidateToken, ValidateRole('owner'), ValidateResource(UserAddPermitSchema), UserAddPermit);

    //Owner remove permit
    app.post('/users/remove/permits', ValidateToken, ValidateRole('owner'), ValidateResource(UserAddPermitSchema), UserRemovePermit);
} 