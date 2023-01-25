import mongoose from 'mongoose';
import {Schema} from 'mongoose';


 const MessageSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: "User", requried: true },
     to: { type: Schema.Types.ObjectId, ref: "User", required: true },
     type: { type: String, enum: ['text', 'image'], default: "text" },
     msg:{type:String,required:true},
     created: { type: Date, default:Date.now}
})


export const MessageModel = mongoose.model('MessageModel', MessageSchema);