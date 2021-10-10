import { MailerService } from '@nestjs-modules/mailer';
import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mailer from '@sendgrid/mail';

@Global()
@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {}

  async sendEmail(body: string) {
    Mailer.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
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
}
