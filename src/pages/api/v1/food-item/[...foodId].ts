import { prisma } from '../../../../../prisma/db/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  try {
    if (method === 'GET') {
      await getFoodItemById(req, res)
    }
  } catch (err: any) {
    console.error(err.message)
    res
      .status(500)
      .send({ success: false, status: 500, errors: [{ msg: 'Server Error' }] })
  }
}

const getFoodItemById = async (req: NextApiRequest, res: NextApiResponse) => {
  let foodId = req.query.foodId?.[0]
  console.log('foodId', foodId)

  if (!foodId)
    return res.status(400).json({
      success: false,
      status: 400,
      errors: [
        {
          msg: 'Bad Request. Please provide a food item id.',
        },
      ],
    })

  const foodItem = await prisma.foodItem.findUnique({
    where: {
      id: foodId,
    },
  })

  if (!foodItem)
    return res.status(500).json({
      success: false,
      status: 500,
      errors: [
        {
          msg: 'Database Error. Food item not found.',
        },
      ],
      error: {
        msg: 'Database Error. Food item not found.',
      },
    })

  return res.status(200).json({
    success: true,
    status: 200,
    msg: `1 food item returned from the database.`,
    data: { foodItem },
  })
}
