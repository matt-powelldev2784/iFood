import { apiCall } from '@/utils/apiUtil'
import { FoodPageItem, Navbar } from '@/components'
import { GetStaticPropsContext } from 'next'
import { TSFoodMenuItem } from '@/ts/interfaces'

interface TSFoodItemResponse {
  foodItem: TSFoodMenuItem
}

export default function FoodItemPage(foodItem: TSFoodItemResponse) {
  const foodItemObj = foodItem.foodItem

  return (
    <>
      <title>Curry Club</title>
      <Navbar />
      <section className="flex min-h-screen items-start justify-center bg-quaternaryGrey/25">
        {foodItem && <FoodPageItem foodItem={foodItemObj} />}
      </section>
    </>
  )
}

// export async function getStaticPaths() {
//   try {
//     const foodItemRequest = await apiCall({
//       httpMethod: 'GET',
//       route: 'api/v1/food-item/food-item',
//     })

//     const paths = foodItemRequest.data.map((foodItem: any) => {
//       return { params: { foodId: [foodItem.id.toString()] } }
//     })

//     return { paths, fallback: 'blocking' }
//   } catch (error) {
//     console.log(error)
//     console.log('[...foodId] getStaticPaths catch block console log')
//     return { paths: [], fallback: 'blocking' }
//   }
// }

// export async function getStaticProps(context: GetStaticPropsContext) {
//   try {
//     const foodId = context.params?.foodId
//     console.log('foodId', foodId)
//     const foodItemRequest = await apiCall({
//       httpMethod: 'GET',
//       route: `/api/v1/food-item/${foodId}`,
//     })

//     // const foodItemRequest = await (
//     //   await fetch(
//     //     `https://nextjs-food-take-away-app-xm8o.vercel.app/api/v1/food-item/${foodId}`
//     //   )
//     // ).json()
//     // console.log('foodItemRequest', foodItemRequest)

//     const foodItem = foodItemRequest.data.foodItem
//     console.log('foodItem', foodItem)

//     return {
//       props: { foodItem },
//       revalidate: 60,
//     }
//   } catch (error) {
//     console.log(error)
//     console.log('[...foodId] getStaticProps catch block console log')
//     return {
//       props: { foodItem: [] },
//     }
//   }
// }
