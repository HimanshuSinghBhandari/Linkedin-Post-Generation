import Groq from "groq-sdk";

const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ API key is not set in environment variables");
}

const groq = new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

export async function generateLinkedInThroughBlogPost(blogUrl: string, options: { [key: string]: string }) {
  const prompt = `Generate a professional, engaging LinkedIn post based on the following blog URL and options:

Blog URL: ${blogUrl}

Selected Options: ${Object.entries(options).map(([key, value]) => `${key}: ${value}`).join('\n')}

Please create a LinkedIn post that summarizes the key points of the blog post at the given URL and adheres to the selected options. Follow this specific structure:

1. Headline (Bold, max 100 characters):
   - Attention-grabbing
   - Incorporates main topic or keyword from the blog post
   - Uses action words if applicable

2. Introduction (2-3 sentences):
   - Hook the reader with a key insight from the blog
   - Present the main idea or problem addressed in the blog
   - Hint at the value of reading further

3. Main Content (3-4 bullet points):
   - Summarize key points or insights from the blog
   - Use data or statistics from the blog if relevant
   - Include a personal reflection or industry implication
   - Address how the blog content solves a problem or provides value

4. Call to Action (1-2 sentences):
   - Encourage readers to check out the full blog post
   - Prompt engagement (e.g., comments, shares, or direct messages)

5. Hashtags (3-5 relevant tags):
   - Mix of broad and specific tags related to the blog content
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
[Attention-Grabbing Headline Based on Blog]\n\n[Compelling Introduction from Blog Insights]\n\n• [Key Point 1 from Blog]\n• [Key Point 2 from Blog]\n• [Key Point 3 from Blog]\n• [Key Point 4 from Blog]\n\n[Call to Action to Read Full Blog]\n\n#RelevantHashtag1 #BlogTopic #IndustryHashtag

Remember to adapt the content and tone based on the blog content (which you should infer from the URL) and selected options. The post should provide value to the reader, summarize the blog effectively, and encourage professional engagement on LinkedIn.`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.1-8b-instant",
    temperature: 0.7,
  });

  return chatCompletion.choices[0]?.message?.content || "";
}