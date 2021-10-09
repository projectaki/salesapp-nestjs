import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { ProductService } from 'src/products/services/product.service';
import { QueueProcessorService } from './queue-processor.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'product-queue',
    }),
    ProductsModule,
  ],
  providers: [QueueProcessorService],
  exports: [QueueProcessorService, BullModule],
})
export class QueueProcessorModule {}
