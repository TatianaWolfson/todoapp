import express from 'express';
import * as mongoose from 'mongoose';
import { api } from './api';
import { Items } from '../mongooseModels/items.mongoose.model';

export function itemsAPI(app:express.Application) {
  api(app, Items, '/api/items/');
}
