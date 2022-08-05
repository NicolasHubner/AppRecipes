import React, { useState } from 'react'
import MyGlobalContext, { IDoneRecipes, IProfile } from './MyContext'

const Provider = ({ children }: any) => {
  const [type, setType] = useState('Foods')
  const [profile, setProfile] = useState<IProfile>({
    email: 'teste@email.com',
    password: 'password',
  })
  const [doneRecipes, setRecipes] = useState<IDoneRecipes[]>([])

  const INITAL_STATE = {
    tipo: type,
    profile,
    doneRecipes,
    setType,
    setProfile,
    setRecipes,
  }

  return (
    <MyGlobalContext.Provider value={INITAL_STATE}>
      {children}
    </MyGlobalContext.Provider>
  )
}

export default Provider
