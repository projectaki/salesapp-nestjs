import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

@Injectable()
export class BaseScrapersService {
  getHtml = async (url: string): Promise<string> => {
    const browser = await puppeteer.use(StealthPlugin()).launch({
      headless: true,
    });
    const page = await browser.newPage();
    // Set user agent is neccessary to avoid detection
    page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
    );
    // networkidle property wait until no more network calls are made
    await page.goto(url, { waitUntil: 'networkidle0' });
    const html = await page.content(); // serialized HTML of page DOM.
    await browser.close();
    return html;
  };
}
