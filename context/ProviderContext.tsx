import React, { useState } from 'react'
import MyGlobalContext, { IDoneRecipes, IFavorite, IProfile } from './MyContext'

const Provider = ({ children }: any) => {
  const [type, setType] = useState('Foods')
  const [profile, setProfile] = useState<IProfile>({
    email: 'teste@email.com',
    password: 'password',
  })
  const [doneRecipes, setRecipes] = useState<IDoneRecipes[]>([])

  const [favorites, setFavorites] = useState<IFavorite[]>([])

  const INITAL_STATE = {
    tipo: type,
    profile,
    doneRecipes,
    favorites,
    setType,
    setProfile,
    setRecipes,
    setFavorites,
  }

  return (
    <MyGlobalContext.Provider value={INITAL_STATE}>
      {children}
    </MyGlobalContext.Provider>
  )
}

export default Provider
