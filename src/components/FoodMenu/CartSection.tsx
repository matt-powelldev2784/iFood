import { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useAppSelector, useAppDispatch } from '@/redux/store/reduxHooks'
import { CartItem } from './CartItem'
import { Cart } from 'iconoir-react'
import { Button } from '@/components'
import { generatePendingOrder } from '@/redux/slices/cartSlice'
import { setLoginToOrderError } from '@/redux/slices/userSlice'
import { useRouter } from 'next/router'
import { TSCartMenuItem } from '@/ts/interfaces'
import Image from 'next/image'

export const CartSection = () => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.order)
  const totalPrice = useAppSelector((state) => state.cart.totalPrice)
  const userId = useAppSelector((state) => state.user.id)
  const router = useRouter()
  const { data: session } = useSession()
  const cartItemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cartItemsDiv = cartItemsRef.current
    if (cartItemsDiv) {
      cartItemsDiv.scrollTop = cartItemsDiv.scrollHeight
    }
  }, [cartItems])

  const items = cartItems?.map((item: TSCartMenuItem) => {
    const { id, image, name, category, price, quantity } = item
    const itemTotal = item.itemTotal

    return (
      <CartItem
        key={id}
        id={id}
        image={image}
        name={name}
        category={category}
        price={price}
        quantity={quantity}
        itemTotal={itemTotal}
      />
    )
  })

  const onConfirmOrder = async () => {
    if (!cartItems.length) return
    if (!session) {
      dispatch(setLoginToOrderError())
      const callbackUrl = encodeURIComponent(router.asPath)
      router.replace(`/api/auth/signin?callbackUrl=${callbackUrl}`)
      return
    }

    await dispatch(
      generatePendingOrder({
        userId,
        foodItems: cartItems,
        totalPrice: totalPrice,
      })
    )

    router.push('/pages/stripe/payment')
  }

  return (
    <section className="flex w-full items-center">
      <div className="item-center flex h-3/4 w-full">
        <div className="h-1/12 flex w-full flex-col items-center justify-center rounded-3xl bg-quaternaryGrey px-6 text-sm shadow-lg md:px-8 md:text-base">
          <div className="flex flex-col items-center justify-center p-4">
            <Image src="/icons/cart_pink.svg" width={75} height={75} alt="" />
            <h1 className="p-2 text-3xl">CHECKOUT</h1>
          </div>
          <div className="w-full">
            <div className="my-1 flex flex-row items-center justify-between bg-primaryPink">
              <div className="relative w-3/12 object-cover"></div>
              <p className="m-1 w-4/12 pl-2 text-white ">Item</p>
              <p className="m-1 w-2/12 text-white">Qty</p>
              <p className="m-1 w-2/12 text-white">Price</p>
              <p className="m-1 w-1/12 text-primaryPink">x</p>
            </div>
          </div>
          <div
            ref={cartItemsRef}
            className="max-h-[15rem] w-full overflow-y-auto"
          >
            {items}
          </div>
          <div className="w-full bg-primaryPink p-2 text-right text-secondaryWhite ">
            <p className="text-bold inline">Order Total = </p>
            <p className="text-bold inline">£{totalPrice.toFixed(2)}</p>
          </div>
          <Button
            type="button"
            text="CONFIRM ORDER"
            optionalClassNames="min-w-[200px] md:min-w-[300px] w-10/12 text-base bg-tertiaryBlack my-5"
            onClick={onConfirmOrder}
          />
        </div>
      </div>
    </section>
  )
}
