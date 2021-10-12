import { MailerService } from '@nestjs-modules/mailer';
import { Global, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import Mailer from '@sendgrid/mail';
import { Product } from 'src/products/models/product.model';

@Global()
@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {
    Mailer.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async sendEmail(body: string) {
    const msg = {
      to: 'akos.madarasz@yahoo.com',
      from: 'akiasus@outlook.com',
      subject: 'The following products have price changes',
      text: 'Price changes',
      html: body,
    };
    Mailer.send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async sendEmailWithTemplate(products: Product[]) {
    const msg = {
      to: 'akos.madarasz@yahoo.com',
      from: 'akiasus@outlook.com',
      templateId: 'd-604aac3c9b7d41e5af6aa1abfe66e04f',
      dynamic_template_data: {
        date: new Date().toString(),
        products,
      },
    };

    Mailer.send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
