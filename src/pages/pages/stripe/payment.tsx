import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../../../components/stripe/CheckoutForm'
import { Navbar, MobileNav } from '@/components'
import { useAppSelector } from '@/redux/store/reduxHooks'
import { useMobileMenuIsOpen } from '@/hooks/hooksIndex'

//@ts-ignore
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Payment() {
  const mobileMenuIsOpen = useMobileMenuIsOpen()
  const [clientSecret, setClientSecret] = useState('')
  const { pendingOrderId } = useAppSelector((state) => state.cart)

  React.useEffect(() => {
    fetch('/api/stripe/stripe-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: pendingOrderId }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [pendingOrderId])

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#c52b67',
    },
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <section>
      {clientSecret && (
        //@ts-ignore
        <Elements options={options} stripe={stripePromise}>
          {mobileMenuIsOpen ? <MobileNav /> : null}
          {mobileMenuIsOpen ? null : <Navbar />}
          {mobileMenuIsOpen ? null : <CheckoutForm />}
        </Elements>
      )}
    </section>
  )
}
