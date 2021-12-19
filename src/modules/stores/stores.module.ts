import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './models/store';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
})
export class StoresModule {}
