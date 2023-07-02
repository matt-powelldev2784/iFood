import { useRouter } from 'next/router'
import { toggleMobileMenu } from '@/redux/slices/userSlice'
import { useAppDispatch } from '@/redux/store/reduxHooks'
import Image from 'next/image'

interface MobileNavItemProps {
  icon: any
  link: string
  name: string
  telephoneHref?: string
}

export const MobileNavItem = ({
  icon,
  link,
  name,
  telephoneHref,
}: MobileNavItemProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const onLinkClick = () => {
    if (!telephoneHref) {
      setTimeout(() => {
        router.push(link)
        dispatch(toggleMobileMenu())
      }, 500)
    }
  }

  if (telephoneHref) {
    return (
      <a href={telephoneHref} className="flex items-center gap-2">
        <div className="">
          <Image src={icon} width={40} height={40} alt="" />
        </div>
        <p className="w-full whitespace-nowrap text-2xl text-secondaryWhite">
          {name}
        </p>
      </a>
    )
  }

  return (
    <button onClick={onLinkClick} className="flex items-center gap-2">
      <div className="">
        <Image src={icon} width={40} height={40} alt="" />
      </div>
      <p className="w-full whitespace-nowrap text-2xl text-secondaryWhite">
        {name}
      </p>
    </button>
  )
}
