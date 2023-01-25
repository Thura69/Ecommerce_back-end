import { FilterQuery } from 'mongoose';
import { UserInput } from '../models/user.model';
import { UserModel } from '../models/user.model';

export async function FindUserWithQuery(input:FilterQuery<UserInput>) {
    return await UserModel.findOne(input).populate('roles permits').select('-__v');
}

export async function UserSave(input: UserInput) {
    return await new UserModel(input).save();
}
