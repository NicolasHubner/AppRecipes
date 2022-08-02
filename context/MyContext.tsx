import { createContext } from 'react'

export interface IMyContext {
  tipo: string
  setType: any
}

const MyGlobalContext = createContext<IMyContext | null>(null)

export default MyGlobalContext
