const mongoose = require("mongoose");

// {
//     "total_calories": 1822,
//     "macros": {
//       "protein": 48,
//       "carbohydrates": 259,
//       "fat": 79
//     },
//     "ingredients": [
//       {
//         "name": "Saag Paneer",
//         "calories": 180
//       },
//       {
//         "name": "Mattar Paneer",
//         "calories": 220
//       },
//       {
//         "name": "Aloo Gobi",
//         "calories": 150
//       },
//       {
//         "name": "Rice",
//         "calories": 205
//       },
//       {
//         "name": "Papadum",
//         "calories": 60
//       },
//       {
//         "name": "Poori",
//         "calories": 230
//       },
//       {
//         "name": "Pakora",
//         "calories": 195
//       },
//       {
//         "name": "Raita",
//         "calories": 80
//       },
//       {
//         "name": "Gulab Jamun",
//         "calories": 502
//       }
//     ]
//   }

const mealSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    mealUrl : {
        type: String,
        required: true,
    },
    total_calories: {
        type: Number,
        required: true,
    },
    macros: {
        protein: {
            type: Number,
            required: true,
        },
        carbohydrates: {
            type: Number,
            required: true,
        },
        fat: {
            type: Number,
            required: true,
        }
    },
    ingredients: [{
        name: {
            type: String,
            required: true,
        },
        calories: {
            type: Number,
            required: true,
        }
    }]
}, {
    timestamps: true,
});


const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;