import { Express } from 'express'
import {  FilterBy, PaginateController } from '../controllers/productsPaginate.controller'


export function PaginageRoute(app:Express) {
    
    //paginate by page
    app.get('/paginate/:page', PaginateController);
    
    //paginate By Cat id
    app.get('/paginate/:type/:id/:page', FilterBy);





}