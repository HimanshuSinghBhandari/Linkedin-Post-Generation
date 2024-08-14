// youtubeTranscript.js
const ytdl = require('ytdl-core');
const { getSubtitles } = require('youtube-captions-scraper');

const getYoutubeContent = async (url) => {
  try {
    const videoId = ytdl.getVideoID(url);
    
    // Fetch video info
    const videoInfo = await ytdl.getBasicInfo(url);
    const title = videoInfo.videoDetails.title;
    const description = videoInfo.videoDetails.description;

    // Fetch captions
    const captions = await getSubtitles({
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
  } catch (error) {
    console.error('YouTube content fetching error:', error);
    throw error;
  }
};

module.exports = { getYoutubeContent };