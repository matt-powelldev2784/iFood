import { Navbar, OrderComplete, MobileNav } from '@/components'
import { useMobileMenuIsOpen } from '@/hooks/hooksIndex'

export default function OrderCompletePage() {
  const mobileMenuIsOpen = useMobileMenuIsOpen()

  return (
    <>
      <title>Curry Club</title>
      {mobileMenuIsOpen ? <MobileNav /> : null}
      {mobileMenuIsOpen ? null : <Navbar />}
      {mobileMenuIsOpen ? null : <OrderComplete />}
    </>
  )
}
