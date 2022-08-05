import { createContext } from 'react'

export interface IProfile {
  email: string
  password: string | unknown
}

export interface IDoneRecipes {
  name: string
  thumb: string
  type?: string
  data: any
  id: string
  path: string
}
export interface IMyContext {
  tipo: string
  profile: IProfile
  doneRecipes: IDoneRecipes[]
  setProfile: React.Dispatch<React.SetStateAction<IProfile>>
  setType: React.Dispatch<React.SetStateAction<string>>
  setRecipes: React.Dispatch<React.SetStateAction<IDoneRecipes[]>>
}

const MyGlobalContext = createContext<IMyContext | null>(null)

export default MyGlobalContext
