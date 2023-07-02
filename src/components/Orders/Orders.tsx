import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/store/reduxHooks'
import { getUserOrders } from '@/redux/slices/ordersSlice'
import { TSOrderItem, TSOrder } from '@/ts/interfaces'
import { OrderItem } from './OrderItem'
import { convertToReableDate } from '@/utils/convertToReableDate'
import Image from 'next/image'
import { Loading } from '@/components'

export const Orders = () => {
  const dispatch = useAppDispatch()
  const { orders, isLoading } = useAppSelector((state) => state.orders)
  const userId = useAppSelector((state) => state.user.id)

  useEffect(() => {
    if (userId) dispatch(getUserOrders(userId))
  }, [userId, dispatch])

  const orderItems = orders?.map((order: TSOrder) => {
    const { orderItems } = order
    const date = convertToReableDate(order.createdAt)
    const orderId = order.id
    const totalPrice = +order.totalPrice

    const orderItemElements = orderItems?.map((item: TSOrderItem) => {
      const { food, quantity } = item
      const { id, image, name, price } = food
      return (
        <OrderItem
          key={id}
          id={id}
          image={image}
          name={name}
          price={price}
          quantity={quantity}
        />
      )
    })

    return (
      <article
        key={orderId}
        className="flex w-screen flex-col items-center justify-center bg-quaternaryGrey p-6 shadow-lg md:m-3 md:w-full md:rounded-3xl"
      >
        <Image src="/icons/orders_pink.svg" width={75} height={75} alt="" />
        <h1 className="pt-2 text-3xl">ORDER ID</h1>
        <h1 className="pb-2 text-lg">{orderId}</h1>
        <h2 className="pb-2 text-lg">{date}</h2>

        <div className="w-full">
          <div className="my-1 flex flex-row items-center justify-between bg-primaryPink">
            <div className="relative w-3/12 object-cover"></div>
            <p className="m-1 w-5/12 pl-2 text-white ">Name</p>
            <p className="m-1 w-2/12 text-white">Qty</p>
            <p className="m-1 w-2/12 text-white">Price</p>
          </div>
          {orderItemElements}
          <div className="w-full bg-primaryPink p-2 text-right text-secondaryWhite ">
            <p className="text-bold inline">Order Total = </p>
            <p className="text-bold inline">£{totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <div className="w-11/12 sm:border-b sm:border-primaryPink sm:py-6 md:hidden"></div>
      </article>
    )
  })

  const noOrders = (
    <div className="relative flex max-w-[800px] flex-col items-center justify-center rounded-3xl bg-secondaryWhite p-8 text-sm sm:w-11/12 md:w-[580px] md:text-base ">
      <Image src="/icons/orders_pink.svg" width={75} height={75} alt="" />
      <h1 className="m-5 rounded-3xl bg-primaryPink p-3 text-lg text-secondaryWhite">
        No orders to display
      </h1>
    </div>
  )

  return (
    <div className="shandow-lg relative m-8 flex max-w-[800px] flex-col items-center justify-center text-sm sm:w-11/12 md:w-[580px] md:text-base">
      <Loading isLoadingState={isLoading} />
      {!isLoading && orders.length === 0 ? noOrders : null}
      {orders.length > 0 ? orderItems : null}
    </div>
  )
}
