import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailModule } from '../../core/mail/mail.module';
import { MailQueueProcessorService } from './mail-queue-processor.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mail',
    }),
    MailModule,
  ],
  providers: [MailQueueProcessorService],
  exports: [BullModule, MailQueueProcessorService],
})
export class QueueProcessorModule {}
