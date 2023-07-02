import { Navbar, FoodMenu, MobileNav } from '@/components'
import { apiCall } from '@/utils/apiUtil'
import { TSFoodMenuItems } from '@/ts/interfaces'
import { useMobileMenuIsOpen } from '@/hooks/hooksIndex'

export default function FoodMenuPage({ menuItems }: TSFoodMenuItems) {
  const mobileMenuIsOpen = useMobileMenuIsOpen()

  return (
    <>
      <title>Curry Club</title>
      {mobileMenuIsOpen ? <MobileNav /> : null}
      {mobileMenuIsOpen ? null : <Navbar />}
      {mobileMenuIsOpen ? null : <FoodMenu menuItems={menuItems} />}
    </>
  )
}

export async function getStaticProps() {
  try {
    const foodItems = await apiCall({
      httpMethod: 'GET',
      route: `/api/v1/food-item/food-item`,
    })

    const { data } = foodItems

    return {
      props: { menuItems: data },
      revalidate: 60,
    }
    //----------------------------------
  } catch (error) {
    // console.log(error)
    console.log('food menu getStaticProps catch block console log')
    return {
      props: { menuItems: [] },
      revalidate: 60,
    }
  }
}
