import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from 'src/mail/mail.service';
import { Product } from 'src/products/models/product.model';

@Processor('mail')
export class MailQueueProcessorService {
  constructor(private readonly mail: MailService) {}
  @Process('email')
  async processProduct(job: Job<Product[]>) {
    console.log('Processing mail');
    this.mail.sendEmailWithTemplate(job.data);
    return {};
  }
}
