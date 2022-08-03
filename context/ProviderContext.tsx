import React, { useState } from 'react'
import MyGlobalContext from './MyContext'

const Provider = ({ children }: any) => {
  const [type, setType] = useState('Comidas')
  const [profile, setProfile ] = useState({
    email: 'teste@email.com',
    password: 'password',
  })

  const INITAL_STATE = {
    tipo: type,
    profile,
    setType,
    setProfile
  }

  return (
    <MyGlobalContext.Provider value={INITAL_STATE}>
      {children}
    </MyGlobalContext.Provider>
  )
}

export default Provider
