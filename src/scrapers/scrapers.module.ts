import { Module } from '@nestjs/common';
import { QueueProcessorModule } from 'src/redis-queue-processor/queue-processor.module';
import { BaseScrapersService } from './base-scrapers.service';
import { ElgigantenScraperService } from './elgiganten-scraper/elgiganten-scraper.service';

@Module({
  imports: [QueueProcessorModule],
  providers: [ElgigantenScraperService],
  exports: [ElgigantenScraperService],
})
export class ScrapersModule {}
