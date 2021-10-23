import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  LogLevel,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingService extends ConsoleLogger {
  isDevelopment: boolean;
  constructor(private configService: ConfigService) {
    super();
    this.isDevelopment = this.configService.get<boolean>('IS_DEVELOPMENT');
  }

  Log(message: string, ...args: any) {
    if (this.isDevelopment) super.log(message, ...args);
    else console.log(message, ...args);
  }
}
