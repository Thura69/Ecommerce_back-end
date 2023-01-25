import {Request,Response,NextFunction} from 'express'
import config from 'config'
import { productModel } from '../models/product.model';
import { Fmsg } from '../utils/helper';

export async function PaginateController(req:Request,res:Response,next:NextFunction) {
    let pageNo  = Number(req.params.page);
    const limit = config.get<number>('pageLimit');
    const reqPage = pageNo == 1 ? 0 : pageNo - 1;
    const SkipCount = limit * reqPage;

    let result = await productModel.find().skip(SkipCount).limit(limit);

    return Fmsg(res,`Paginated Page No ${pageNo}`, result);




}

export async function FilterBy(req: Request, res: Response, next: NextFunction) {
    let type = req.params.type;

     let pageNo  = Number(req.params.page);
    const limit = config.get<number>('pageLimit');
    const reqPage = pageNo == 1 ? 0 : pageNo - 1;
    const SkipCount = limit * reqPage;

    let filterObject:any = {};
     

     switch (type) {
        case 'cat': filterObject['cat'] = req.params.id; break;
        case 'subCat':filterObject['subCat'] = req.params.id; break;
        case 'childCat':filterObject['childCat'] = req.params.id; break;
        case 'tag': filterObject['tag'] = req.params.id; break;

    }

    let result = await productModel.find(filterObject).skip(SkipCount).limit(limit);

    return Fmsg(res,`Paginated Page No ${pageNo}`, result);

}

