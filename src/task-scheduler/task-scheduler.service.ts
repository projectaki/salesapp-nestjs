import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskSchedulerService {
  @Cron(CronExpression.EVERY_10_SECONDS)
  cronTest() {
    console.log('Testing cron jobs');
  }
}
