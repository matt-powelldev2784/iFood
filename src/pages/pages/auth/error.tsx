import { Main, Navbar } from '@/components'
import { useSession } from 'next-auth/react'

export default function Error({}) {
  const { data: session } = useSession()
  console.log('session', session)

  return (
    <>
      <Navbar />
      <Main>
        <section className=" relative flex max-w-[400px] flex-col items-center justify-center rounded-3xl bg-secondaryWhite p-6 sm:w-11/12 md:w-[400px] md:p-8">
          <h1 className="py-5 text-3xl">UNKNOWN ERROR</h1>
          <p className="text-center">
            Please use the back button on your browser and try again
          </p>
        </section>
      </Main>
    </>
  )
}
