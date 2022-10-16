import { NotFoundError } from '../helpers/apiError'
import Product, { ProductDocument } from '../models/Product'

const createOne = async (productReview: ProductDocument) => {
  return await productReview.save()
}

const getAll = async () => {
  return await Product.find()
}

const getById = async (id: string) => {
  const foundOne = await Product.findById(id)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const updateOne = async (id: string, update: Partial<ProductDocument>) => {
  const foundOne = await Product.findByIdAndUpdate(id, update)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const foundOne = await Product.findByIdAndDelete(id)
  if (foundOne) {
    return foundOne
  } else {
    throw new NotFoundError()
  }
}

export default {
  createOne,
  getAll,
  getById,
  updateOne,
  deleteOne,
}
