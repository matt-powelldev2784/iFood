import { Navbar, FoodMenu } from '@/components'
import { apiCall } from '@/utils/apiUtil'
import { TSFoodMenuItems } from '@/ts/interfaces'

export default function FoodMenuPage({ menuItems }: TSFoodMenuItems) {
  return (
    <>
      <title>Curry Club</title>
      <Navbar />
      <section className="top-[3rem] min-h-screen md:top-[4rem]">
        <FoodMenu menuItems={menuItems} />
      </section>
    </>
  )
}

export async function getStaticProps() {
  try {
    const foodItems = await apiCall({
      httpMethod: 'GET',
      route: `api/v1/food-item/food-item`,
    })

    // const foodItems = await (
    //   await fetch(
    //     `https://nextjs-food-take-away-app-xm8o.vercel.app/api/v1/food-item/food-item`
    //   )
    // ).json()
    // console.log('foodItems-----------', foodItems)

    const { data } = foodItems
    return {
      props: { menuItems: data },
      revalidate: 60,
    }
    //----------------------------------
  } catch (error) {
    console.log(error)
    console.log('food menu getStaticProps catch block console log')
    // return {
    //   props: { menuItems: [] },
    //   revalidate: 60,
    // }
  }
}
