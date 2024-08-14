import Groq from "groq-sdk";

const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ API key is not set in environment variables");
}

const groq = new Groq({ 
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

export async function generateLinkedInPost(userInput: string, options: { [key: string]: string }) {
  const prompt = `Generate a professional, engaging LinkedIn post based on the following input and options:

User Input: ${userInput}

Selected Options:
${Object.entries(options).map(([key, value]) => `${key}: ${value}`).join('\n')}

Please create a LinkedIn post that incorporates the user's input and adheres to the selected options. Follow this specific structure:

1. Headline (Bold, max 100 characters):
   - Attention-grabbing
   - Incorporates main topic or keyword
   - Uses action words if applicable

2. Introduction (3-4 sentences):
   - Hook the reader
   - Present the main idea or problem
   - Hint at the value of reading further

3. Main Content (3-5 bullet points):
   - Each point should be concise and valuable
   - Use data or statistics if relevant
   - Include personal insights or industry trends
   - Address pain points or offer solutions

4. Call to Action (1 sentence):
   - Clear and specific
   - Encourage engagement (e.g., comments, shares, or direct messages)

5. Hashtags (3-5 relevant tags):
   - Mix of broad and specific tags
   - Include at least one industry-specific hashtag

Formatting Guidelines:
- Use appropriate line breaks (represented by \n) to separate sections
- Keep bullet points concise, starting each with •
- Ensure the total post length is under 1300 characters

Tone and Style:
- Professional yet conversational
- Tailored to the specified industry (based on options)
- Engaging and thought-provoking
- Avoid jargon unless it's industry-standard

Example Format:
[Attention-Grabbing Headline]\n\n[Compelling Introduction]\n\n• [Key Point 1]\n• [Key Point 2]\n• [Key Point 3]\n• [Key Point 4]\n\n[Strong Call to Action]\n\n#RelevantHashtag1 #IndustryHashtag #TrendingHashtag

Remember to adapt the content and tone based on the user's input and selected options. The post should provide value to the reader and encourage professional engagement on LinkedIn.`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-groq-70b-8192-tool-use-preview",
    temperature: 0.7,
  });

  return chatCompletion.choices[0]?.message?.content || "";
}