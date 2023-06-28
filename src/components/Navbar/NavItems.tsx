import { useSession } from 'next-auth/react'
import { navItemsList } from './NavItemsList'
import { NavItem } from './NavItem'

export const NavItems = () => {
  const { data: session, status } = useSession()

  const NavItems = navItemsList.map((item) => {
    const { id, icon, link, name, telephoneHref, sessionReq } = item
    if (session && name === 'Login') {
      return null
    }
    if (session && sessionReq) {
      return (
        <NavItem
          key={id}
          icon={icon}
          link={link}
          name={name}
          telephoneHref={telephoneHref}
        />
      )
    }
    if (!sessionReq) {
      return (
        <NavItem
          key={id}
          icon={icon}
          link={link}
          name={name}
          telephoneHref={telephoneHref}
        />
      )
    }
  })

  return (
    <div className="flex w-fit flex-row justify-between gap-8">{NavItems}</div>
  )
}
