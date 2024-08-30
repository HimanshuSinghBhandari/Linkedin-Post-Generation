import ytdl from 'ytdl-core';
import { getSubtitles } from 'youtube-captions-scraper'

interface YoutubeContent {
  title: string;
  description: string;
  subtitles: string;
}

export const getYoutubeContent = async (url: string): Promise<YoutubeContent> => {
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
    const fullContent: YoutubeContent = {
      title: title,
      description: description!,
      subtitles: subtitlesText
    };

    return fullContent;
  } catch (error) {
    console.error('YouTube content fetching error:', error);
    throw error;
  }
};
