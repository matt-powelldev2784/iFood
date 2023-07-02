import { MobileNavItems } from './MobileNavItems'
import Image from 'next/image'
import { useToogleMobileMenu } from '@/hooks/hooksIndex'

export const MobileNav = () => {
  const toggleMobileMenu = useToogleMobileMenu()

  return (
    <nav className="fixed top-0 z-50 min-h-screen w-screen bg-primaryPink">
      <div className="absolute top-4 right-6" onClick={toggleMobileMenu}>
        <Image src="/icons/x_sqaure.svg" width={50} height={50} alt="" />
      </div>
      <div className="h-screen w-full">
        <MobileNavItems />
      </div>
    </nav>
  )
}
