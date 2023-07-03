import { FoodSection, LinkButton, CartSection } from '@/components'
import { TSFoodMenuItems, TSFoodByCategory } from '@/ts/interfaces'
import { splitFoodByCategory } from './splitFoodByCategory'
import { OrderFooter } from '@/components'

export const FoodMenu = ({ menuItems }: TSFoodMenuItems) => {
  const foodSplitByCatergory = splitFoodByCategory(menuItems)

  const categorys = foodSplitByCatergory.map((foodCatergory) => {
    const { category } = foodCatergory
    const capitalizedCategory =
      category.charAt(0).toUpperCase() + category.slice(1)
    return capitalizedCategory
  })

  const categoryButtons = categorys.map((category) => {
    return (
      <LinkButton
        key={category}
        type="button"
        href="/pages/food-menu/food-menu"
        text={category}
        optionalClassNames="text-xl x-2 h-[1.8rem] rounded-3xl text-sm p-0 px-2 md:px-4 m-1 md:mx-2"
      />
    )
  })

  //----------------------------------------------------------------------------------
  const foodCatergory = foodSplitByCatergory.map(
    (foodCategory: TSFoodByCategory) => {
      const { category, foodItems } = foodCategory
      return (
        <FoodSection key={category} category={category} foodItems={foodItems} />
      )
    }
  )
  //----------------------------------------------------------------------------------

  return (
    <section className="top-[3rem] min-h-screen md:top-[4rem]">
      <div className="flex w-screen min-w-[320px] flex-col items-center justify-center bg-quaternaryGrey/25">
        {/* <nav className="w-full bg-quaternaryGrey p-1 text-center">
          {categoryButtons}
        </nav> */}
        <div className="flex w-full lg:gap-5">
          <div className="flex max-w-[1000px] grow flex-col items-center">
            {foodCatergory}
          </div>
          <div className="mr-14 grow self-start p-10 sm:hidden md:hidden lg:block">
            <CartSection />
          </div>
        </div>
        <div className="min-h-[5rem] bg-quaternaryGrey"></div>
        <OrderFooter />
      </div>
    </section>
  )
}
