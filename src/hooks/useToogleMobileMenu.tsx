import { useAppDispatch, useAppSelector } from '@/redux/store/reduxHooks'
import { toggleMobileMenu } from '@/redux/slices/userSlice'

export const useToogleMobileMenu = () => {
  const dispatch = useAppDispatch()

  const handleToggleMobileMenu = () => {
    dispatch(toggleMobileMenu())
  }

  return handleToggleMobileMenu
}
