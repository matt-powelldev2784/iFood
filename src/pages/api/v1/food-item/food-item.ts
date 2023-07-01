import { prisma } from '../../../../../prisma/db/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { FoodCategory } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  try {
    switch (method) {
      case 'POST':
        await addFoodItem(req, res)
        break
      case 'GET':
        await getFoodItems(req, res)
        break
      case 'PUT':
        await updateFoodItemWithId(req, res)
        break
      case 'DELETE':
        await deleteFoodItemWithId(req, res)
        break
    }
  } catch (err: any) {
    console.error(err.message)
    res
      .status(500)
      .send({ success: false, status: 500, errors: [{ msg: 'Server Error' }] })
  }
}

//----------------------------------------------------------------------------------

const addFoodItem = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, image, category, price } = req.body

  const foodCategorys = Object.values(FoodCategory)
  const validCatergory = foodCategorys.filter((foodCategory) => {
    if (foodCategory === category) return true
  })
  const isValidCatergory = validCatergory.length > 0

  if (!isValidCatergory) {
    return res.status(500).send({
      success: false,
      status: 500,
      errors: [
        {
          msg: 'Server Error. Invalid food category provided.',
        },
      ],
    })
  }

  const newFoodItem = await prisma.foodItem.create({
    data: {
      name,
      price,
      image,
      category,
    },
  })

  return res.status(201).json({
    success: true,
    status: 201,
    msg: 'New food item added to database',
    data: newFoodItem,
  })
}

//----------------------------------------------------------------------------------

const getFoodItems = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('getfooditems')
  const foodItems = await prisma.foodItem.findMany({
    select: { id: true, name: true, price: true, image: true, category: true },
  })

  const numberOfFoodItems = foodItems.length

  return res.status(200).json({
    success: true,
    status: 200,
    msg: `There are ${numberOfFoodItems} food items returned from the database.`,
    data: foodItems,
  })
}

//----------------------------------------------------------------------------------

const updateFoodItemWithId = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, name, image, category, price } = req.body

  const foodItemToUpdate = await prisma.foodItem.findUnique({
    where: { id: id },
  })

  if (!foodItemToUpdate) {
    return res.status(500).send({
      success: false,
      status: 500,
      errors: [
        {
          msg: 'Server Error. Unable to find food item with the id provided.',
        },
      ],
    })
  }
  const updatedFoodItem = await prisma.foodItem.update({
    where: {
      id: id,
    },
    data: {
      name,
      price,
      image,
      category,
    },
  })

  return res.status(200).json({
    success: true,
    status: 200,
    msg: 'Food item updated in database',
    data: {
      updatedEntry: updatedFoodItem,
    },
  })
}

//----------------------------------------------------------------------------------

const deleteFoodItemWithId = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.body

  const foodItemToDelete = await prisma.foodItem.findUnique({
    where: { id: id },
  })

  if (!foodItemToDelete) {
    return res.status(500).send({
      success: false,
      status: 500,
      errors: [
        {
          msg: 'Server Error. Unable to find food item with the id provided.',
        },
      ],
    })
  }

  const updatedFoodItem = await prisma.foodItem.delete({
    where: {
      id: id,
    },
  })

  return res.status(200).json({
    success: true,
    status: 200,
    msg: 'Food item deleted from database',
    data: {
      deletedItem: updatedFoodItem,
    },
  })
}
