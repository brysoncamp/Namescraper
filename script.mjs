// Import dotenv to load environment variables
import { config } from 'dotenv';
config();

// Import the OpenAI class from the openai package
import OpenAI from "openai"; 

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Access the API key from .env
});

// Define an async function to query GPT-4o-mini
async function queryGPT() {
  try {
    console.time('OpenAI Request Duration'); // Start the timer

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // Use the correct model name
      messages: [
        { role: "system", content: "Generate 100 quality domain names (without TLD) for the prompt. 10 character max. Do not be verbose." },
        { role: "user", content: "a website for generating names and checking availability" },
      ],
    });

    console.timeEnd('OpenAI Request Duration'); // End the timer and log the duration

    const names = completion.choices[0].message.content.trim().split('\n').map(name => name.trim());
    console.log(names.length);
    console.log(names);
    console.log("---------------");
    const uniqueNames = [...new Set(names)];
    console.log(uniqueNames.length);
    console.log(uniqueNames);

  } catch (error) {
    console.error("Error querying GPT:", error);
  }
}

// Run the function to get the completion
queryGPT();
