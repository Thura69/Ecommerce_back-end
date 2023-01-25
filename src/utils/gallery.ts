import fs from 'fs';
import {Request,Response,NextFunction} from 'express';
import fileUpload from 'express-fileupload';

export async function SaveSingleFile(req: Request, res: Response, next: NextFunction) {

    let filename: any = req.files?.file;
    if (filename) {
        let fileMv = filename.mv;
    filename = filename.name;
    filename = new Date().valueOf() + "_" + filename;
    fileMv(`./src/uploads/${filename}`);
    req.body["image"] = filename;
    next();
    } else {
        next();
    }
} 

export let saveMultipleFile = async (req:any, res:Response, next:NextFunction) => {
    let filenames: string[] = [];
    
    let file = req.files?.files;
    if (file) {
          file.forEach((file : any) => {
     let  filename = new Date().valueOf() + "_" + file.name;
      filenames.push(filename);
      file.mv(`./src/uploads/${filename}`);
   });
   req.body["images"] = filenames;
   next();
    } else {
       return next();
    }
}


// let deleteFile = async (filename) => {
//    let filepath = `./uploads/${filename}`;
//    await fs.unlinkSync(filepath);
// }

// let deleteMultipleFile = async (filenames) => {
//    filenames.forEach(async filename => {
//       await deleteFile(filename);
//    });
// }

