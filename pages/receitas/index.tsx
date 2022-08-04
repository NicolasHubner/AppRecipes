import { useContext } from 'react'
import Drinks from '../../components/Drinks'
import Foods from '../../components/Foods'
import MyGlobalContext, { IMyContext } from '../../context/MyContext'
import { IType } from '../../helpers/interfaces/myContext'

export default function Receitas({ meals, drinks }: IType) {
  const value = useContext(MyGlobalContext) as IMyContext
  const { tipo } = value

  return (
    <>
      <h1>Recipes: {tipo}</h1>
      {tipo === 'Foods' ? <Foods data={meals} /> : <Drinks data={drinks} />}
    </>
  )
}

export const getStaticProps = async () => {
  const foodsFetch = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s='
  )
  const foodsArray = await foodsFetch.json()
  const drinksFetch = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
  )
  const drinksArray = await drinksFetch.json()

  return {
    props: {
      meals: foodsArray,
      drinks: drinksArray,
    },
  }
}
