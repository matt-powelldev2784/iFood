interface NavItem {
  id: number
  name: string
  icon: string
  link: string
  telephoneHref?: string
  sessionReq: boolean
}

export const navItemsList: NavItem[] = [
  {
    id: 1,
    name: 'Menu',
    icon: '/icons/menu.svg',
    link: '/pages/food-menu/food-menu',
    sessionReq: false,
  },
  {
    id: 2,
    name: 'Orders',
    icon: '/icons/orders.svg',
    link: '/pages/orders/orders',
    sessionReq: true,
  },
  {
    id: 3,
    name: 'Cart',
    icon: '/icons/cart.svg',
    link: '/pages/confirm-order/confirm-order',
    sessionReq: true,
  },
  {
    id: 4,
    name: 'Sign Out',
    icon: '/icons/signout.svg',
    link: '/api/auth/signout',
    sessionReq: true,
  },
  {
    id: 4,
    name: 'Login',
    icon: '/icons/signin.svg',
    link: '/pages/auth/signin',
    sessionReq: false,
  },
  {
    id: 5,
    name: '020 8888 8888',
    icon: '/icons/tel.svg',
    link: '',
    telephoneHref: 'tel:02088888888',
    sessionReq: false,
  },
]
