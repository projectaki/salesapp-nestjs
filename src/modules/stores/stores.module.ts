import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './models/store';
import { StoreResolver } from './resolvers/store.resolver';
import { StoreService } from './services/store.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  providers: [StoreService, StoreResolver],
  exports: [StoreService],
})
export class StoresModule {}
