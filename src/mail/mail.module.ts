import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { MailService } from './mail.service';

@Module({
  imports: [LoggerModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
