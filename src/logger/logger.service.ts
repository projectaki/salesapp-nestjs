import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  LogLevel,
} from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {}
