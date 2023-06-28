import { signOut } from 'next-auth/react'
import { Navbar, Button } from '@/components'
import { useAppDispatch } from '@/redux/store/reduxHooks'
import { resetAllState } from '@/redux/store/store'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function SignOut({}) {
  const dispatch = useAppDispatch()
  const { data: session } = useSession()
  console.log('session', session)

  const onSignOutClick = async () => {
    await signOut({ callbackUrl: '/' })
    dispatch(resetAllState())
  }

  return (
    <>
      <Navbar />
      <section className="flex min-h-screen justify-center bg-quaternaryGrey md:bg-quaternaryGrey/25">
        <article className="flex h-[20rem] max-w-[400px] flex-col items-center justify-center rounded-3xl p-8 sm:w-screen md:m-8 md:w-[400px] md:bg-quaternaryGrey md:shadow-lg">
          <Image src="/icons/home.svg" width={125} height={125} alt="" />
          <h1 className="pb-5 text-3xl">SIGN OUT</h1>
          <div className="flex w-full flex-col items-center text-lg md:w-11/12">
            <Button
              type="button"
              onClick={onSignOutClick}
              text={'Sign Out'}
              optionalClassNames="w-full rounded-lg m-2"
            />
          </div>
        </article>
      </section>
    </>
  )
}
