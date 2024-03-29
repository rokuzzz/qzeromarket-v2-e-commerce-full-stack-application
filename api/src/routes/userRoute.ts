import { Router } from 'express'

import { verifyUserOrAdmin, verifyAdmin } from '../middlewares/tokenVerificator'
import userController from '../controllers/userController'

const userRoute = Router()

userRoute.get('/', verifyAdmin, userController.getAllUsers)
userRoute.get('/find/:id', verifyAdmin, userController.getUserById)
userRoute.put('/:id', verifyUserOrAdmin, userController.updateUser)
userRoute.delete('/:id', verifyUserOrAdmin, userController.deleteUser)
userRoute.get('/profile', userController.getUserByJWT)

export default userRoute
