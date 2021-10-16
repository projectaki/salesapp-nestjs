import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from 'src/mail/mail.service';
import { Product } from 'src/products/models/product.model';

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
