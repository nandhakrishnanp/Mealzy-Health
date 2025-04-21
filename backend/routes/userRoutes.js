const { loginUser, registerUser, getUserById } = require('../controller/userController');

const router = require('express').Router();



router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);


module.exports = router;