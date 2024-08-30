import express, { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';
import { getYoutubeContent } from './services/youtubeTranscript';

const app = express();
app.use(cors());
app.use(express.json());

const scrapeSite = async (url: string): Promise<string> => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    const content = await page.evaluate(() => {
      const mainContent = document.querySelector('main');
      return mainContent ? mainContent.innerText : document.body.innerText;
    });

    return content;
  } catch (error) {
    console.error('Scraping error:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

app.post('/scrape', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const scrapedContent = await scrapeSite(url);
    res.json({ content: scrapedContent });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while scraping' });
  }
});

app.post('/youtube-content', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const youtubeContent = await getYoutubeContent(url);
    res.json(youtubeContent);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching YouTube content' });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
