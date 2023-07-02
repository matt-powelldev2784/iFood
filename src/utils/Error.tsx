interface ErrorProps {
  errorMessage: string
}

export const Error = ({ errorMessage = '' }: ErrorProps) => {
  const errorJSX = (
    <div className="flex flex-col">
      <p className="m-2 text-center text-red-500">
        Server Error. Unable to load data.
      </p>
      <p className="m-2 text-center text-red-500">{errorMessage}</p>
    </div>
  )

  return (
    <div className="flex w-full items-center justify-center overflow-hidden">
      {errorMessage ? errorJSX : null}
    </div>
  )
}
