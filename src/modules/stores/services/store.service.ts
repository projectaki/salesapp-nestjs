import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store, StoreDocument } from '../models/store';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
  ) {}

  getAll = async (): Promise<Store[]> => {
    return await this.storeModel.find({}).exec();
  };

  getByIds = async (ids: string[]): Promise<Store[]> => {
    return await this.storeModel.find({ _id: { $in: ids } });
  };
}
