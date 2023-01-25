import { FilterQuery, Query, UpdateQuery } from 'mongoose';
import { RoleInput } from './../models/role.model';
import { PermitInput } from './../models/permit.model';
import PermitModel from "../models/permit.model";
import {Request} from 'express';


export async function FindPermit(input: FilterQuery<PermitInput>) { 
        return await PermitModel.findOne(input);
}

export async function SavePermit(input:PermitInput) {
    return await PermitModel.create(input);
}

export async function GetAllPermit() {
    return await PermitModel.find().select('-__v');
}

export async function GetOnePermit(input:string) {
    return await PermitModel.findById(input).select('-__v');
}

export async function UpdatePermit(input:FilterQuery<PermitInput>,update:UpdateQuery<PermitInput>) {
    return await PermitModel.findByIdAndUpdate(input,update).select('-__v')
}

export async function DeletePermit(input: FilterQuery<PermitInput>) {
    return await PermitModel.findByIdAndDelete(input).select('-__v');
}