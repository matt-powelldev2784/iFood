import { useAppSelector } from '@/redux/store/reduxHooks'

interface LoadingProps {
  isLoadingState: boolean
}

export const Loading = ({ isLoadingState }: LoadingProps) => {
  const loadingJSX = (
    // eslint-disable-next-line
    <img src="/loading.svg" alt="" className="mt-6 animate-spin" />
  )

  return (
    <div className="flex w-full items-center justify-center overflow-hidden">
      {isLoadingState ? loadingJSX : null}
    </div>
  )
}
