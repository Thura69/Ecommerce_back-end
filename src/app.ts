import  jwt from 'jsonwebtoken';
import express, { ErrorRequestHandler } from 'express';
import config from 'config';
import {Request,Response,NextFunction} from 'express';
import { routes } from './routes.routes';
import { connect } from './utils/connect';
import  fileUpload from 'express-fileupload'
import fs from 'fs';



const port = config.get<string>('port');

const app = express();







app.use(express.json());
app.use(fileUpload());

app.listen(port, () => {
    connect();
    routes(app);

    console.log(`Server is now running at http://localhost/${port}`)
})

