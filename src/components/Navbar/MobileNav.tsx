import { MobileNavItems } from './MobileNavItems'
import Image from 'next/image'
interface MobileNavProps {
  onClick: () => void
}

export const MobileNav = ({ onClick }: MobileNavProps) => {
  return (
    <nav className="fixed top-0 z-50 min-h-screen w-screen bg-primaryPink">
      <div className="absolute top-4 right-6" onClick={onClick}>
        <Image src="/icons/x_sqaure.svg" width={50} height={50} alt="" />
      </div>
      <div className="h-screen w-full">
        <MobileNavItems />
      </div>
    </nav>
  )
}
