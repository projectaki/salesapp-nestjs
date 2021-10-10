import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { ProductsModule } from 'src/products/products.module';
import { ProductService } from 'src/products/services/product.service';
import { QueueProcessorService } from './queue-processor.service';
import { MailQueueProcessorService } from './mail-queue-processor.service';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'product-queue',
      },
      {
        name: 'mail',
      },
    ),
    MailModule,
  ],
  providers: [QueueProcessorService, MailQueueProcessorService],
  exports: [QueueProcessorService, BullModule, MailQueueProcessorService],
})
export class QueueProcessorModule {}
