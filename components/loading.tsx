import React, { useEffect, useState } from 'react'

export const Loading = (): JSX.Element => {

  const [show, setShow] = useState(false)

  useEffect(() => {

    const timeout = setTimeout(() => {
      setShow(true)
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  if (show) {
    return <span>Loading...</span>
  }

  return <></>
}