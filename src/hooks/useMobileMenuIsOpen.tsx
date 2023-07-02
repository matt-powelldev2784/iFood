import { useAppSelector } from '@/redux/store/reduxHooks'

export const useMobileMenuIsOpen = () => {
  const mobileMenuIsOpen = useAppSelector(
    (state) => state.user.mobileMenuIsOpen
  )
  return mobileMenuIsOpen
}
