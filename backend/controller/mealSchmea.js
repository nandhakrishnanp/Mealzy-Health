const Meal = require("../model/mealSchmea");






const createMeal = async (req, res) => {
    try {
        const { total_calories, macros, ingredients ,userId } = req.body;

        if (!total_calories || !macros || !ingredients) {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }

        const newMeal = new Meal({
            userId,
            total_calories,
            macros,
            ingredients
        });

        await newMeal.save();

        res.json({
            message: "Meal created successfully",
            meal: newMeal
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: error.message
        });
    }
}

const getMealsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const meals = await Meal.find({ userId });

        if (!meals) {
            return res.status(404).json({
                message: "No meals found for this user"
            });
        }

        res.json({
            message: "Meals fetched successfully",
            meals
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: error.message
        });
    }
}


module.exports = {
    createMeal,
    getMealsByUserId
}