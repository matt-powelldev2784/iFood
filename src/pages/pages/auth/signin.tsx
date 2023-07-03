import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { getProviders, signIn } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]'
import { Navbar, Button } from '@/components'
import Image from 'next/image'

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const elements = form.elements as HTMLFormControlsCollection
    const emailInput = elements.namedItem('email') as HTMLInputElement
    const email = emailInput.value

    if (email) {
      await signIn('email', {
        email,
        callbackUrl: '/pages/food-menu/food-menu',
      })
    }
  }

  const emailProvider = Object.values(providers).filter((provider) => {
    if (provider.name === 'Email') {
      return true
    }
  })

  const oAuthProviders = Object.values(providers).filter((provider) => {
    if (provider.name !== 'Email') {
      return true
    }
  })

  const emailProviderJSX = emailProvider.map((provider) => {
    return (
      <div key={provider.name} className="w-full pb-4 text-lg md:w-11/12">
        <form
          onSubmit={handleEmailSignIn}
          className="flex flex-col items-center"
        >
          <label htmlFor="email" className="w-full pl-1 text-base">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            className="w-full rounded border p-2 text-lg"
          />

          <Button
            type="submit"
            optionalClassNames="w-full p-2 rounded-lg my-2"
            text={`Sign in with ${provider.name}`}
          ></Button>
        </form>
      </div>
    )
  })

  const oAuthProvidersJSX = oAuthProviders.map((provider) => {
    return (
      <div key={provider.name} className="w-full text-lg md:w-11/12">
        <Button
          type="button"
          onClick={() => signIn(provider.id)}
          text={`Sign in with ${provider.name}`}
          optionalClassNames="w-full rounded-lg p-2 my-2"
        />
      </div>
    )
  })

  return (
    <>
      <Navbar />
      <section className="flex min-h-screen justify-center bg-quaternaryGrey md:bg-quaternaryGrey/25">
        <div className="flex h-[32rem] max-w-[400px] flex-col items-center justify-center p-8 sm:w-screen md:m-8 md:w-[400px] md:rounded-3xl md:bg-quaternaryGrey md:shadow-lg">
          <Image src="/icons/signin_pink.svg" width={125} height={125} alt="" />
          <h1 className="pb-5 text-3xl">SIGN IN</h1>
          {...emailProviderJSX}
          {...oAuthProvidersJSX}
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    )

    const callbackUrl = context.query.callbackUrl
    const redirectUrl = callbackUrl ? callbackUrl : '/pages/food-menu/food-menu'

    if (session) {
      return { redirect: { destination: redirectUrl } }
    }

    const providers = await getProviders()

    return {
      props: { providers: providers ?? [] },
    }
  } catch (error) {
    console.log(error)
    console.log('signin get server side props ctach block console log')
    return {
      props: { providers: [] },
    }
  }
}
