const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {runModel} = require('./ai/receipe');
const dotenv = require('dotenv');
const app = express();
const { generateCalories } = require('./ai/calorie');
const User = require('./model/userSchmea');
const Meal = require('./model/mealSchmea');

dotenv.config();
const PORT =3001;

app.use(cors());

const connectDb = async () => {
    try {
      const connect = await mongoose.connect(process.env.DATABASE_URL, {
        dbName: "mealzy",
      });
      console.log("MongoDB connection success");
    } catch (error) {
      console.log("MongoDB connection failed");
      console.log(error);
    }
  };
  connectDb();


app.use(express.json());

app.use("/meal",require("./routes/mealRoutes"))
app.use("/user",require("./routes/userRoutes"))
app.get('/', (req, res) => 
    {
        res.send('Hello World');
    }
)

app.post('/api/recipe', async (req, res) => {   

    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }
    try {
        const response = await runModel(prompt);
        res.json(response);
    } catch (error) {
        console.error('Error generating recipe:', error);
        res.status(500).json({ error: 'Failed to generate recipe' });
    }
}
);


app.post('/api/calorie', async (req, res) => {   

    const { url , userId } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'Image URL is required' });
    }
    try {
        
        const response = await generateCalories(url);
         const  { total_calories, macros, ingredients } =JSON.parse(response);
        const newMeal = new Meal({
          userId,
          mealUrl: url,
            total_calories,
            macros,
            ingredients
        });
        await newMeal.save();
        res.json(response);
    } catch (error) {
        console.error('Error generating recipe:', error);
       res.json(error)
    }
}
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




