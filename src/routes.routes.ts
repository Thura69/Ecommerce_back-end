import { Express } from 'express';
import { CategoryRoutes } from './routes/category.routes';
import { ChildCatRoute } from './routes/childcat.routes';
import { DeliveryRoute } from './routes/delivery.routes';
import { OrderRoute } from './routes/order.routes';
import { PaginageRoute } from './routes/paginate.routes';
import { PermitRoute } from './routes/permit.routes';
import { ProductRoutes } from './routes/product.routes';
import { RoleRoutes } from './routes/role.routes';
import { SubCatRoute } from './routes/subcat.routes';
import { TagsRoute } from './routes/tag.routes';
import { UserRoutes } from './routes/user.routes';
import { WarrentyRoutes } from './routes/warrenty.routes';

export function routes(app:Express) {
    
    //PermitRoute
    PermitRoute(app);

    //RoleRoute
    RoleRoutes(app);

    //userRoute
    UserRoutes(app);

    //categoryRoute
    CategoryRoutes(app);

    //subCateRoute
    SubCatRoute(app);

    //ChildCatRoute
    ChildCatRoute(app);

    //TagsRoute
    TagsRoute(app);

    //DeliveryRoute
    DeliveryRoute(app);

    //WarrentyRoute
    WarrentyRoutes(app);

    //productRoute
    ProductRoutes(app);

    //paginate
    PaginageRoute(app);

    //orderRoute
    OrderRoute(app);
}