"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYoutubeContent = void 0;
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const youtube_captions_scraper_1 = require("youtube-captions-scraper");
const getYoutubeContent = async (url) => {
    try {
        const videoId = ytdl_core_1.default.getVideoID(url);
        // Fetch video info
        const videoInfo = await ytdl_core_1.default.getBasicInfo(url);
        const title = videoInfo.videoDetails.title;
        const description = videoInfo.videoDetails.description;
        // Fetch captions
        const captions = await (0, youtube_captions_scraper_1.getSubtitles)({
            videoID: videoId,
            lang: 'en' // You can change this to get captions in different languages
        });
        const subtitlesText = captions.map(caption => caption.text).join(' ');
        // Combine all content
        const fullContent = {
            title: title,
            description: description,
            subtitles: subtitlesText
        };
        return fullContent;
    }
    catch (error) {
        console.error('YouTube content fetching error:', error);
        throw error;
    }
};
exports.getYoutubeContent = getYoutubeContent;
