// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

const { GoogleGenAI } = require('@google/genai');
  async function runModel(prompt) {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const config = {
      temperature: 1.85,
      responseMimeType: 'application/json',
      systemInstruction: [
          {
            text: `For the Given dish give , Healthier Receipe with Receipe name , Ingridients , instructions , and total macros breakdown`,
          }
      ],
    };
    const model = 'gemini-2.0-flash-lite';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `Chicken tika`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `[
    {
      "recipe_name": "Healthy Chicken Tikka Masala",
      "ingredients": [
        "1.5 lbs boneless, skinless chicken breasts, cut into 1-inch cubes",
        "1 cup plain nonfat Greek yogurt",
        "1 tablespoon lemon juice",
        "1 tablespoon ginger-garlic paste",
        "1 teaspoon garam masala",
        "1/2 teaspoon turmeric powder",
        "1/2 teaspoon red chili powder (adjust to taste)",
        "1/4 teaspoon cumin powder",
        "Salt to taste",
        "1 tablespoon olive oil",
        "1 large onion, finely chopped",
        "1 (14.5 ounce) can diced tomatoes, undrained",
        "1/2 cup tomato sauce",
        "1/2 cup water or chicken broth",
        "1/2 cup chopped fresh cilantro",
        "Cooked brown rice or cauliflower rice, for serving"
      ],
      "instructions": [
        "Marinate the Chicken: In a bowl, combine the chicken cubes with Greek yogurt, lemon juice, ginger-garlic paste, garam masala, turmeric powder, red chili powder, cumin powder, and salt. Mix well and refrigerate for at least 30 minutes, or up to 4 hours.",
        "Cook the Chicken: Heat olive oil in a large skillet or pan over medium-high heat. Add the marinated chicken and cook until browned on all sides and cooked through, about 6-8 minutes. Remove the chicken from the pan and set aside.",
        "Sauté the Onion: Add the chopped onion to the same skillet and cook until softened and lightly browned, about 5-7 minutes.",
        "Add Tomatoes and Sauce: Stir in the diced tomatoes, tomato sauce, and water or chicken broth. Bring the mixture to a simmer.",
        "Combine and Simmer: Return the cooked chicken to the skillet. Reduce the heat to low, cover, and simmer for 15-20 minutes, or until the sauce has thickened slightly and the flavors have melded.",
        "Garnish and Serve: Stir in the fresh cilantro. Serve the chicken tikka masala hot, over cooked brown rice or cauliflower rice."
      ],
      "total_macros_breakdown": {
        "calories": "Approximately 400-500 calories per serving (depending on portion size and rice choice)",
        "protein": "Approximately 40-50g per serving",
        "carbohydrates": "Approximately 30-40g per serving (including rice)",
        "fats": "Approximately 15-20g per serving"
      }
    }
  ]`,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `veg Pulav
  `,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `[
    {
      "recipe_name": "Healthy Vegetable Pulao",
      "ingredients": [
        "1 cup basmati rice, rinsed",
        "1.5 cups vegetable broth (low sodium)",
        "1 tablespoon olive oil",
        "1/2 cup chopped onion",
        "1 cup mixed vegetables (carrots, peas, beans, etc.), chopped",
        "1/2 teaspoon ginger-garlic paste",
        "1/4 teaspoon turmeric powder",
        "1/4 teaspoon garam masala",
        "Salt to taste",
        "Fresh cilantro, chopped (for garnish)"
      ],
      "instructions": [
        "Rinse the Rice: Rinse the basmati rice under cold water until the water runs clear. Drain well.",
        "Sauté Aromatics and Vegetables: Heat olive oil in a pot or pan with a tight-fitting lid over medium heat. Add the chopped onion and sauté until softened, about 3-4 minutes. Add ginger-garlic paste and cook for another minute until fragrant. Add the mixed vegetables and cook for 2-3 minutes.",
        "Add Spices and Rice: Stir in the turmeric powder, garam masala, and salt. Add the rinsed rice and stir to coat with the spices and vegetables.",
        "Add Broth and Cook: Pour in the vegetable broth. Bring the mixture to a boil, then reduce the heat to low, cover the pot tightly, and simmer for 15-20 minutes, or until all the liquid is absorbed and the rice is cooked through. Do not lift the lid during this time.",
        "Fluff and Serve: Once the rice is cooked, remove from heat and let it sit, covered, for 5 minutes. Fluff the rice with a fork. Garnish with fresh cilantro and serve hot."
      ],
      "total_macros_breakdown": {
        "calories": "Approximately 350-400 calories per serving (depending on vegetable quantity)",
        "protein": "Approximately 8-10g per serving",
        "carbohydrates": "Approximately 60-70g per serving",
        "fats": "Approximately 5-8g per serving"
      }
    }
  ]`,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });
      
      let fullText = "";
      
      for await (const chunk of response) {
        console.log(chunk.text); // Log each streamed part
        fullText += chunk.text;  // Collect it
      }
      
      return fullText; // Now return the complete response
      

  }
  

  module.exports = {
    runModel
  }