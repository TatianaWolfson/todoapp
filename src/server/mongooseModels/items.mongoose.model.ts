import mongoose from 'mongoose';
import {IItem} from "../models/item.model";

interface IItemModel extends IItem, mongoose.Document {}

export const ItemsSchema = new mongoose.Schema({title: {type: String, required: true}}, {collection : 'items'});
export const Items = mongoose.model<IItemModel>('Items', ItemsSchema);
