import { Navbar, ConfirmOrder } from '@/components'
import withAuth from '../../withAuth'

function ConfirmOrderPage() {
  return (
    <>
      <title>Curry Club</title>
      <Navbar />
      <div className="flex min-h-screen items-start justify-center bg-quaternaryGrey md:bg-quaternaryGrey/25">
        <ConfirmOrder />
      </div>
    </>
  )
}

export default withAuth(ConfirmOrderPage)
