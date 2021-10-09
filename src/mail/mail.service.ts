import { MailerService } from '@nestjs-modules/mailer';
import { Global, Injectable } from '@nestjs/common';
import Mailer from '@sendgrid/mail';

@Global()
@Injectable()
export class MailService {
  async sendEmail(body: string) {
    Mailer.setApiKey(
      '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',
    );
    const msg = {
      to: 'akos.madarasz@yahoo.com',
      from: 'akiasus@outlook.com',
      subject: 'The following products have price changes',
      text: 'and easy to do anywhere, even with Node.js',
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
