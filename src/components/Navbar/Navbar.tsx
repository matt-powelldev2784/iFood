import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NavItems } from './NavItems'

import { useAppDispatch } from '@/redux/store/reduxHooks'
import { getAuthUser } from '@/redux/slices/userSlice'
import { useToogleMobileMenu, useMobileMenuIsOpen } from '@/hooks/hooksIndex'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const toogleMobileMenu = useToogleMobileMenu()

  useEffect(() => {
    const getUser = async () => {
      await dispatch(getAuthUser())
    }
    getUser()
  }, [dispatch])

  return (
    <header className="relative h-[3rem] w-screen md:h-[4rem]">
      <nav className="fixed top-0 z-40 flex h-[3rem] w-screen min-w-[280px] flex-row items-center justify-between bg-primaryPink text-secondaryWhite md:h-[4rem]">
        <Image
          src="/icons/hamburger.svg"
          width={25}
          height={25}
          className="fill-floralWhite ml-4 cursor-pointer md:mx-8 lg:hidden"
          alt=""
          onClick={toogleMobileMenu}
        />
        <Link href="/">
          <div className="relative min-h-[2.5rem] min-w-[10rem] md:min-h-[3rem] md:min-w-[14rem] lg:ml-6 ">
            <Image
              src="/curry_club_white_sm.png"
              fill
              style={{ objectFit: 'contain' }}
              alt="Indian Platter"
              sizes="(max-width: 600px) 200px, 300px"
            />
          </div>
        </Link>

        <div className="mr-4 flex items-end gap-2 md:mx-8">
          <div className="relative hidden lg:block ">
            <NavItems />
          </div>
          <a href={'tel:02088888888'}>
            <Image
              src="/icons/tel.svg"
              className="block cursor-pointer lg:hidden"
              width={30}
              height={30}
              alt=""
            />
          </a>
        </div>
      </nav>
    </header>
  )
}
