import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Product } from '../../modules/products/models/product.model';
import { MailService } from '../../core/mail/mail.service';

@Processor('mail')
export class MailQueueProcessorService {
  constructor(private readonly mail: MailService) {}

  // When a message is sent with products tag to mail queue, do the following.
  @Process('products')
  async processProduct(job: Job<Product[]>) {
    this.mail.sendEmail(job.data, 'akosegypro@gmail.com');
    return {};
  }
}
