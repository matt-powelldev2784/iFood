import Image from 'next/image'

export const Footer = () => {
  return (
    <footer className="relative w-screen min-w-[280px] bg-primaryPink pb-10 ">
      <div className="flex flex-col gap-8 text-xl text-secondaryWhite md:flex-row">
        <div className="min-w-[320px] grow pt-4 text-center md:pl-8 md:text-left">
          <p className="pb-2 text-2xl font-bold md:pb-4">Links</p>
          <div className="flex flex-row items-center justify-center gap-4 md:justify-start">
            <Image src="/icons/instagram.svg" width={50} height={50} alt="" />
            <Image src="/icons/twitter.svg" width={50} height={50} alt="" />
            <Image src="/icons/facebook.svg" width={50} height={50} alt="" />
          </div>
        </div>

        <div className="grow text-center md:pr-10 md:pt-4 md:text-right">
          <p className="text-2xl font-bold md:pb-4">Contact Us</p>
          <p>1 London Walk</p>
          <p>London</p>
          <p>SW1 1AA</p>
          <p>0208 888 8888</p>
          <a
            className="text-2xl underline underline-offset-2"
            href="mailto:info@curryclub.com"
          >
            info@curryclub.com
          </a>
        </div>
      </div>
    </footer>
  )
}
