import mongoose from 'mongoose';
import {Schema} from 'mongoose';


 const MessageSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: "User", requried: true },
     to: { type: Schema.Types.ObjectId, ref: "User", required: true },
     created: { type: Date, default:Date.now}
})


export const UnreadModel = mongoose.model('Unread', MessageSchema);