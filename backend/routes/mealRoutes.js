const { createMeal, getMealsByUserId } = require('../controller/mealSchmea');

const router = require('express').Router();

router.post('/create', createMeal);
router.get('/:userId', getMealsByUserId);

module.exports = router;