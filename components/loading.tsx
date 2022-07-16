import React, { useEffect, useState } from 'react'

export const Loading = () => {

  const [show, setShow] = useState(false)

  useEffect(() => {

    const timeout = setTimeout(() => {
      setShow(true)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div>
      {show && <p>Loading...</p>}
    </div>
  )
}