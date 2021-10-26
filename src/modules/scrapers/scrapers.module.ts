import { Module } from '@nestjs/common';
import { QueueProcessorModule } from 'src/utils/redis-queue-processor/queue-processor.module';
import { ElgigantenScraperService } from './elgiganten-scraper/elgiganten-scraper.service';

@Module({
  imports: [QueueProcessorModule],
  providers: [ElgigantenScraperService],
  exports: [ElgigantenScraperService],
})
export class ScrapersModule {}
