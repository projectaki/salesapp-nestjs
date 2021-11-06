import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mailer from '@sendgrid/mail';
import { Product } from '../../modules/products/models/product.model';
import { LoggingService } from '../logger/logger.service';

@Injectable()
export class MailService {
  constructor(
    private configService: ConfigService,
    private logger: LoggingService,
  ) {
    Mailer.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async sendEmail(products: Product[], recipient: string) {
    const msg = {
      to: recipient,
      from: this.configService.get<string>('EMAIL_HOST'),
      templateId: 'd-295b6355f4274c738e73eeb63e89fc0f',
      dynamic_template_data: {
        date: new Date().toString(),
        products,
      },
    };

    Mailer.send(msg).then(() => {
      this.logger.log('Email Sent!');
    });
  }

  // async sendEmailWithRawHtmlBody(body: string) {
  //   const msg = {
  //     to: 'akos.madarasz@yahoo.com',
  //     from: 'akiasus@outlook.com',
  //     subject: 'The following products have price changes',
  //     text: 'Price changes',
  //     html: body,
  //   };
  //   Mailer.send(msg)
  //     .then(() => {
  //       console.log('Email sent');
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
}
