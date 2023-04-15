import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store/reduxHooks'
import { getUserOrders } from '@/redux/slices/ordersSlice'
import { TSOrderItem, TSOrder } from '@/ts/interfaces'
import { FaClipboardList } from 'react-icons/fa'
import { CartItem } from '../ConfirmOrder/CartItem'
import { convertToReableDate } from '@/utils/convertToReableDate'

export const Orders = () => {
  const dispatch = useAppDispatch()
  const { orders } = useAppSelector((state) => state.orders)
  const userId = useAppSelector((state) => state.user.id)

  useEffect(() => {
    if (userId) dispatch(getUserOrders(userId))
  }, [userId, dispatch])

  const orderItems = orders?.map((order: TSOrder) => {
    const { orderItems } = order
    const date = convertToReableDate(order.createdAt)
    const orderId = order.id

    const orderItem = orderItems?.map((item: TSOrderItem) => {
      const { food, quantity } = item
      const { id, image, name, category, price } = food
      return (
        <CartItem
          key={id}
          id={id}
          image={image}
          name={name}
          category={category}
          price={price}
          quantity={quantity}
        />
      )
    })

    return (
      <article
        key={orderId}
        className="w-full flex justify-center items-center flex-col rounded-3xl bg-tertiaryGold p-4  m-3"
      >
        <FaClipboardList size="75px" />
        <h1 className="text-3xl pt-2">ORDER ID</h1>
        <h1 className="text-lg pb-2">{orderId}</h1>
        <h2 className="text-lg pb-2">{date}</h2>

        <div className="w-full">
          <div className="flex flex-row justify-between items-center bg-primaryRed my-1">
            <div className="relative w-3/12 object-cover"></div>
            <p className="text-white w-5/12 m-1 pl-2 ">Name</p>
            <p className="text-white w-2/12 m-1">Qty</p>
            <p className="text-white w-2/12 m-1">Price</p>
          </div>

          {orderItem}
        </div>
      </article>
    )
  })

  return (
    <div className="relative sm:w-11/12 md:w-[580px] max-w-[800px] text-sm md:text-base flex flex-col items-center justify-center  ">
      {orderItems}
    </div>
  )
}
