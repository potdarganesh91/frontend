import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Protector(props) {
  const navigate = useNavigate()
  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem('key')
  //   if (isLoggedIn === '' || isLoggedIn === null || isLoggedIn === undefined) {
  //     navigate('/login')
  //   }
  // }, [navigate])

  useEffect(() => {
    // const storedUser = localStorage.getItem('key')
    // const storedUserRole = localStorage.getItem('user_role')
    const isLoggedIn = localStorage.getItem('token')

    if (isLoggedIn === '' || isLoggedIn === null || isLoggedIn === undefined) {
      navigate('/login')
    }

   
  }, [navigate])
  // eslint-disable-next-line react/prop-types
  const Component = props.Component
  return (
    <div>
      <Component></Component>
    </div>
  )
}
