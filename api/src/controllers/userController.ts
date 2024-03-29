import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import CryptoJS from 'crypto-js'

import { CRYPTO_SECRET, JWT_SECRET } from '../util/secrets'
import userService from '../services/userService'
import { UnauthorizedError } from '../helpers/apiError'

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const user = await userService.findById(id)
    const { password, ...others } = user?._doc

    res.status(200).json(others)
  } catch (err) {
    next(err)
  }
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.findAll()

    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

const getUserByJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (typeof authHeader == 'undefined') {
      throw new UnauthorizedError('You are not authorized!')
    }

    const token = (authHeader as string).split(' ')[1]

    jwt.verify(token, JWT_SECRET, async (err: any, decoded: any) => {
      if (err) {
        next(err)
      } else {
        try {
          req.user = decoded

          const user = await userService.findById(decoded.id)
          const { password, ...others } = user?._doc

          res.status(200).send(others)
        } catch (err) {
          next(err)
        }
      }
    })
  } catch (err) {
    next(err)
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      CRYPTO_SECRET
    ).toString()
  }

  const { id } = req.params
  const { _id, role, ...others } = req.body

  try {
    const updatedUser = await userService.updateOne(
      id,
      { $set: { ...others } },
      { new: true }
    )

    res.status(200).json(updatedUser)
  } catch (err) {
    next(err)
  }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    await userService.deleteOne(id)

    res.status(200).json('User has been deleted.')
  } catch (err) {
    next(err)
  }
}

export default {
  getAllUsers,
  getUserById,
  getUserByJWT,
  updateUser,
  deleteUser,
}
