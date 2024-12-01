"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const cors_1 = __importDefault(require("cors"));
const youtubeTranscript_1 = require("./services/youtubeTranscript");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const scrapeSite = async (url) => {
    let browser;
    try {
        browser = await puppeteer_1.default.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });
        const content = await page.evaluate(() => {
            const mainContent = document.querySelector('main');
            return mainContent ? mainContent.innerText : document.body.innerText;
        });
        return content;
    }
    catch (error) {
        console.error('Scraping error:', error);
        throw error;
    }
    finally {
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
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while scraping' });
    }
});
app.post('/youtube-content', async (req, res) => {
    try {
        const { url } = req.body;
        const youtubeContent = await (0, youtubeTranscript_1.getYoutubeContent)(url);
        res.json(youtubeContent);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching YouTube content' });
    }
});
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
