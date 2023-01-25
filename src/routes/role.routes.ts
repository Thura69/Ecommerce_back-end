import { ValidateResource } from './../middlewares/valideResource';
import { CreateRole, GetOneRole, GetOneAndUpdateRole, DeleteRole, PermitAddToRole } from './../schema/role.schema';
import {Express} from 'express'
import { addRoleController, dropRoleController, getAllRoleController, getOneRoleController, PermitAddToRoleController, RoleRemovePermit, UpdateRoleController } from '../controllers/role.controllers';
import { ValidateAnyRole } from '../middlewares/validateAnyRole';
import { ValidateToken } from '../middlewares/validateToken';
import { ValidateAnyPermit } from '../middlewares/validateAnyPermit';



export async function RoleRoutes(app: Express) {
    //role add
    app.post('/roles', ValidateToken, ValidateAnyRole(['owner']), ValidateResource(CreateRole), addRoleController);
    
    //get all roles
    app.get('/roles', getAllRoleController);

    //update roles
    app.post('/roles/:roleId', ValidateResource(GetOneAndUpdateRole), UpdateRoleController);

    //getone role
    app.get('/roles/:roleId', ValidateResource(GetOneRole), getOneRoleController);

    //delete role
    app.delete('/roles/:roleId', ValidateResource(DeleteRole), dropRoleController);

    //add permit
    app.post('/add/permits', ValidateResource(PermitAddToRole), PermitAddToRoleController);
    app.post('/remove/permits', ValidateResource(PermitAddToRole), RoleRemovePermit);
   
}