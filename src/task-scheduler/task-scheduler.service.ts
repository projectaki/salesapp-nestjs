import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
//import { runIfIdle } from './tasks/task';

@Injectable()
export class TaskSchedulerService {
  // cronTest = runIfIdle(
  //   () =>
  //     new Promise((resolve, error) => {
  //       setTimeout(() => {
  //         resolve();
  //       }, 5000);
  //     }),
  // );
  // @Cron(CronExpression.EVERY_5_SECONDS)
  // cronTest();
}
