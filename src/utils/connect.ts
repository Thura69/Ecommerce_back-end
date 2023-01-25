import mongoose from "mongoose";
import config from 'config'

export async function connect() {
    mongoose.connect(`mongodb://127.0.0.1:27017/${config.get<string>('dbName')}`);
    
    return console.log("Db is now connected sir!!")
}

