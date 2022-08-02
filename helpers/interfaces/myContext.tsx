export interface IMyContext {
  state: State
  foodsApi: Function
}

export interface State {
  name: string
  secondName: string
}
export interface IType {
  meals?: object[]
  drinks?: object[]
}
