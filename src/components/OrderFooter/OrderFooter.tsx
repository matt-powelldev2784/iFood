import { useSession } from 'next-auth/react'
import { useAppSelector, useAppDispatch } from '@/redux/store/reduxHooks'
import { useRouter } from 'next/router'
import { setLoginToOrderError } from '@/redux/slices/userSlice'

export const OrderFooter = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { numOfOrderItems, totalPrice } = useAppSelector((state) => state.cart)
  const totalPriceWithDecimal = totalPrice.toFixed(2)
  const { data: session } = useSession()

  const onOrderClick = () => {
    if (!session) {
      dispatch(setLoginToOrderError())
      const callbackUrl = encodeURIComponent(router.asPath)
      router.replace(`/api/auth/signin?callbackUrl=${callbackUrl}`)
      return
    }
    router.push('/pages/confirm-order/confirm-order')
  }

  const orderItems = (
    <div className="fixed bottom-0 left-0 z-20 flex w-screen min-w-[320px] flex-row items-center justify-between gap-2 bg-quaternaryGrey px-3 py-2 text-secondaryWhite lg:hidden">
      <p className="w-[2rem] bg-primaryPink text-center md:mx-4">
        {numOfOrderItems}
      </p>
      <p onClick={onOrderClick} className="bg-primaryPink p-2">
        Checkout
      </p>
      <p className="bg-primaryPink p-2 md:mx-4">£{totalPriceWithDecimal}</p>
    </div>
  )

  return <>{numOfOrderItems > 0 ? orderItems : null}</>
}
