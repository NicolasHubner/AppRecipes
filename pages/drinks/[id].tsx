import { Button } from '@mui/material'
import Link from 'next/link'
import { cockTailApi } from '../../helpers/functions/foodAndCocktailApi'
import styles from './id.module.css'

interface IProps {
  data: {
    idDrink: string
    strDrink: string
    strInstructions: string
    strDrinkThumb: string
    strYoutube: string
  }
}
interface IParams {
  params: {
    id: number
  }
}
interface IItem {
  idDrink: number
}

export default function DrinksID(props: IProps) {
  const { data } = props
  const ingredients = Object.entries(data).filter(
    (item) => item[0].includes('strIngredient') && item[1] !== null
  )
  const measure = Object.entries(data).filter(
    (item) => item[0].includes('strMeasure') && item[1] !== null && ' '
  )
  const measureIngredients = ingredients.map((item) => {
    if (measure.length === 1) return [...item, measure[0][1]]
    return [...item, measure[0][1]]
  })
  return (
    <div className={styles.container}>
      <picture>
        <source srcSet={data.strDrinkThumb} type="image/webp" />
        <img
          src={data.strDrinkThumb}
          alt={data.strDrink}
          width="100%"
          className={styles.image}
        />
      </picture>
      <h1>{data.strDrink}</h1>
      <div>
        <h3 className={styles.title}>Ingredients</h3>
        <ul className={styles.ul}>
          {measureIngredients.map((item, i) => (
            <li className={styles.li} key={i}>
              - {`${item[1]} - ${item[2]}`}
            </li>
          ))}
        </ul>
        <h3 className={styles.title}>Instructions</h3>
        <p className={styles.instruct}>{data.strInstructions}</p>
      </div>
      <Link href={`/drinks/${data.idDrink}/in-progress`}>
        <Button
          size="large"
          sx={{
            mb: '80px',
            width: '280px',
            height: '50px',
            backgroundColor: 'rgb(240, 165, 26)',
            color: 'black',
          }}
          variant="contained"
        >
          Start Recipe
        </Button>
      </Link>
    </div>
  )
}

export async function getStaticPaths() {
  const data = await cockTailApi()
  const paths = data.drinks.map((item: IItem) => ({
    params: {
      id: item.idDrink,
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: IParams) {
  const data = await cockTailApi()
  const res = data.drinks.find((item: IItem) => item.idDrink === params.id)
  return {
    props: {
      data: res,
    },
  }
}
