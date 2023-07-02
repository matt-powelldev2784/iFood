import { prisma } from '../../../../../prisma/db/client'
import { NextApiRequest, NextApiResponse } from 'next'
import authMiddleware from '@/pages/api/auth/auth-middleware'

export default authMiddleware(handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req
    if (method === 'GET') await getUserOrders(req, res)
  } catch (err: any) {
    console.error(err.message)
    res
      .status(500)
      .send({ success: false, status: 500, errors: [{ msg: 'Server Error' }] })
  }
}

//----------------------------------------------------------------------------------
const getUserOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId?.[0]

  if (!userId) {
    return res.status(400).json({
      success: false,
      status: 400,
      errors: [{ msg: 'No user id provided' }],
    })
  }

  const userOrders = await prisma.order.findMany({
    where: {
      userId: userId,
      orderConfirmed: true,
    },
    include: {
      orderItems: {
        include: {
          food: true,
        },
      },
    },
  })
  const numberOfUserOrders = userOrders.length

  if (userOrders.length === 0) {
    return res.status(404).json({
      success: false,
      status: 404,
      errors: [{ msg: 'No orders found for this user' }],
    })
  }

  return res.status(200).json({
    success: true,
    status: 200,
    msg: `There are ${numberOfUserOrders} user orders in the database`,
    data: userOrders,
  })
}
