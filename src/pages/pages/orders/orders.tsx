import { Orders, Navbar, MobileNav } from '@/components'
import withAuth from '@/pages/withAuth'
import { useMobileMenuIsOpen } from '@/hooks/hooksIndex'

function OrdersPage() {
  const mobileMenuIsOpen = useMobileMenuIsOpen()
  return (
    <>
      {mobileMenuIsOpen ? <MobileNav /> : null}
      {mobileMenuIsOpen ? null : <Navbar />}
      <Orders />
    </>
  )
}

export default withAuth(OrdersPage)
