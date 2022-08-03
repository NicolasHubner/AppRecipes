import { createContext } from 'react'

interface IProfile {
  email: string
  password: string
}

export interface IMyContext {
  tipo: string
  profile: IProfile
  setProfile:  React.Dispatch<React.SetStateAction<IProfile>>
  setType:  React.Dispatch<React.SetStateAction<string>>
}

const MyGlobalContext = createContext<IMyContext | null>(null)

export default MyGlobalContext
