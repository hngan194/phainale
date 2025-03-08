const express = require('express');
const { signUp, signIn, getAllProfile, getOneProfile, changeProfile, changePassword } = require('../controllers/authCtrl');
const authRouter = express.Router()

const checkPermission = require('../middlewares/checkPermission');

authRouter.post('/change-password/:id', checkPermission, changePassword)
authRouter.post('/signup', signUp)
authRouter.post('/signin', signIn)

authRouter.get('/', checkPermission, getAllProfile)

authRouter.get('/:id', getOneProfile)

authRouter.patch('/:id', 
// checkPermission
changeProfile)


module.exports = authRouter