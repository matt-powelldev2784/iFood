import { useState } from 'react'
import { TSFoodMenuItem } from '@/ts/interfaces'
import Image from 'next/image'
import { addCartItem } from '@/redux/slices/cartSlice'
import { useAppDispatch } from '@/redux/store/reduxHooks'
import { InfoEmpty } from 'iconoir-react'
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
      <article className="flex h-[10rem] basis-11/12 items-center rounded-xl border-2 border-black/25 bg-secondaryWhite md:basis-full">
        <div className="flex h-full w-8/12 flex-col justify-between p-4">
          <p className="text-lg">{name}</p>
          <p className="text-md">{price}</p>
          <div className="flex grow items-end">
            <Button
              text="Add to cart"
              type="button"
              optionalClassNames="bg-primaryPink text-secondaryWhite p-2 cursor-pointer bottom-0"
              onClick={handleAddtoCart}
            />
          </div>
        </div>

        <div className="relative m-4 h-5/6 w-4/12">
          <p
            className="absolute right-2 bottom-2 z-10 cursor-pointer rounded-lg bg-primaryPink p-1 text-center text-sm text-white"
            onClick={handleMoreInfoClick}
          >
            <Image src="/icons/info.svg" width={25} height={25} alt="" />
          </p>
          <Image
            src={`/foodImages/${image}`}
            fill
            style={{ objectFit: 'cover', borderRadius: '8px' }}
            alt={name}
            quality={50}
            sizes="(max-width: 600px) 100px, 200px"
          />
        </div>
      </article>
    </>
  )
}
