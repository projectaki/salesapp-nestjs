import { Schema } from 'mongoose';

export interface MongoFilterOptions {
  projectionFields: string[];
  schema: Schema;
}
