const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const { getYoutubeContent } = require('./youtubeTranscript');

const app = express();
app.use(cors());
app.use(express.json());

const scrapeSite = async (url) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
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

app.post('/scrape', async (req, res) => {
  try {
    const { url } = req.body;
    const scrapedContent = await scrapeSite(url);
    res.json({ content: scrapedContent });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while scraping' });
  }
});

app.post('/youtube-content', async (req, res) => {
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