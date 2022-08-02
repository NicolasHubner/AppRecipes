import React, { useState } from 'react'
import MyGlobalContext from './MyContext'

const Provider = ({ children }: any) => {
  const [type, setType] = useState('Comidas')

  const INITAL_STATE = {
    tipo: type,
    setType
  }

  return (
    <MyGlobalContext.Provider value={INITAL_STATE}>
      {children}
    </MyGlobalContext.Provider>
  )
}

export default Provider
