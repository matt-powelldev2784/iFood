import Link from 'next/link'
import Image from 'next/image'

interface NavItemProps {
  icon: any
  link: string
  name: string
  telephoneHref?: string
}

export const NavItem = ({ icon, link, name, telephoneHref }: NavItemProps) => {
  if (telephoneHref) {
    return (
      <a href={telephoneHref} className="flex items-center gap-2">
        <Image src="/icons/tel.svg" width={25} height={25} alt="" />
        <p className="w-full whitespace-nowrap text-xl text-secondaryWhite">
          {name}
        </p>
      </a>
    )
  }

  return (
    <Link href={link} className="flex w-fit items-center gap-2">
      <div className="">
        <Image src={icon} width={30} height={30} alt="" />
      </div>
      <p className="w-full whitespace-nowrap text-xl text-secondaryWhite">
        {name}
      </p>
    </Link>
  )
}
