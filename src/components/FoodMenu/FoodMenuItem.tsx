import { useState } from 'react'
import { TSFoodMenuItem } from '@/ts/interfaces'
import Image from 'next/image'
import { addCartItem } from '@/redux/slices/cartSlice'
import { useAppDispatch } from '@/redux/store/reduxHooks'
import { Plus, Minus, InfoEmpty } from 'iconoir-react'
import { useRouter } from 'next/router'
import { Button } from '@/components'

export const FoodMenuItem = ({
  id,
  image,
  name,
  category,
  price,
}: TSFoodMenuItem) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [quantity, setQuantity] = useState<number>(1)

  const handleAddtoCart = () => {
    dispatch(addCartItem({ id, name, category, price, image, quantity }))
  }

  const handleQuantityIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleQuantityDecrease = () => {
    if (quantity === 1) return
    setQuantity((prevQuantity) => prevQuantity - 1)
  }

  const handleMoreInfoClick = () => {
    router.push(`${id}`)
  }

  return (
    <>
      <article className="h-[10rem] flex basis-11/12 md:basis-full items-center border-2 border-black/60 rounded-xl bg-secondaryWhite">
        <div className="w-7/12 h-full flex flex-col justify-between p-4">
          <p className="text-lg">{name}</p>
          <p className="text-md">{price}</p>
          <div className="grow flex items-end">
            <p
              className="bg-primaryPink text-secondaryWhite p-2 bottom-0"
              onClick={handleAddtoCart}
            >
              Add to Cart
            </p>
          </div>
        </div>

        <div className="relative w-5/12 h-full">
          <Image
            src={`/foodImages/${image}`}
            fill
            style={{ objectFit: 'cover', borderRadius: '0 8px 8px 0' }}
            alt={name}
            quality={30}
            sizes="(max-width: 600px) 100px, 200px"
          />
        </div>
      </article>
    </>
  )
}
