// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

// import {
//   GoogleGenAI,
// } from '@google/genai';

const { GoogleGenAI } = require("@google/genai");
async function generateCalories(url) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const res = await fetch(url);
  const imageArrayBuffer = await res.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");

  const config = {
    responseMimeType: "application/json",
    systemInstruction: [
      {
        text: `for given Food Image , give  Total Calories , macros , and give  each ingredients calorie ( give all values as number , dont add approzimately)`,
      },
    ],
  };
  const model = "gemini-2.0-flash";
  const contents = [
    {
      role: 'model',
      parts: [
        {
          text: `{
  "total_calories": 1822,
  "macros": {
    "protein": 48,
    "carbohydrates": 259,
    "fat": 79
  },
  "ingredients": [
    {
      "name": "Saag Paneer",
      "calories": 180
    },
    {
      "name": "Mattar Paneer",
      "calories": 220
    },
    {
      "name": "Aloo Gobi",
      "calories": 150
    },
    {
      "name": "Rice",
      "calories": 205
    },
    {
      "name": "Papadum",
      "calories": 60
    },
    {
      "name": "Poori",
      "calories": 230
    },
    {
      "name": "Pakora",
      "calories": 195
    },
    {
      "name": "Raita",
      "calories": 80
    },
    {
      "name": "Gulab Jamun",
      "calories": 502
    }
  ]
}`,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: `for given Food Image , give Total Calories , macros , and give each ingredients calorie ( give all values as number , dont add approzimately)`,
        },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64ImageData,
          },
        },
      ],
    },
  ];
  

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let text = "";
  for await (const chunk of response) {
    console.log(chunk.text);
    text += chunk.text;
  }
  return text;
}

module.exports = {
  generateCalories,
};
