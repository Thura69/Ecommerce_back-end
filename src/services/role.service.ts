import { RoleInput } from './../models/role.model';
import { FilterQuery, UpdateQuery } from 'mongoose';
import RoleModel from "../models/role.model";


export async function FindRole(input: FilterQuery<RoleInput>) { 
    return await RoleModel.findOne(input).select('-__v');
}

export async function CreateRole(input: RoleInput) {
    return await RoleModel.create(input);
}

export async function FindAllRoles() {
    return await RoleModel.find().populate('permits',"-__v").select('-__v');
}

export async function FindOneRole(input:string) {
    return await RoleModel.findById(input).select("-__v");
}

export async function UpdateRole(input: FilterQuery<RoleInput>, update: UpdateQuery<RoleInput>) {
     return await RoleModel.findByIdAndUpdate(input,update).select('-__v')
}

export async function DropRole(input: FilterQuery<RoleInput>) {
    return await RoleModel.findByIdAndDelete(input).select('-__v');
}