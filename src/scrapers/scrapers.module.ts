import { Module } from '@nestjs/common';
import { QueueProcessorModule } from 'src/queue-processor/queue-processor.module';
import { BaseScrapersService } from './base-scrapers.service';
import { ElgigantenScraperService } from './elgiganten-scraper/elgiganten-scraper.service';

@Module({
  imports: [QueueProcessorModule],
  providers: [BaseScrapersService, ElgigantenScraperService],
  exports: [ElgigantenScraperService],
})
export class ScrapersModule {}
