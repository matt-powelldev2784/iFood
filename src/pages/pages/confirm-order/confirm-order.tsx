import { Navbar, ConfirmOrder, MobileNav } from '@/components'
import withAuth from '../../withAuth'
import { useMobileMenuIsOpen } from '@/hooks/hooksIndex'

function ConfirmOrderPage() {
  const mobileMenuIsOpen = useMobileMenuIsOpen()

  return (
    <>
      <title>Curry Club</title>
      {mobileMenuIsOpen ? <MobileNav /> : null}
      {mobileMenuIsOpen ? null : <Navbar />}
      {mobileMenuIsOpen ? null : <ConfirmOrder />}
    </>
  )
}

export default withAuth(ConfirmOrderPage)
