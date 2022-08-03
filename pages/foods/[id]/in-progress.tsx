import { Button, Checkbox } from '@mui/material'
import Link from 'next/link'
import { foodsApi } from '../../../helpers/functions/foodAndCocktailApi'
import styles from '../id.module.css'

interface IProps {
  data: {
    idMeal: string
    strMeal: string
    strInstructions: string
    strMealThumb: string
    strYoutube: string
  }
}
interface IParams {
  params: {
    id: number
  }
}
interface IItem {
  idMeal: number
}

export default function inProgress(props: IProps) {
  const { data } = props
  const ingredients = Object.entries(data).filter(
    (item) => item[0].includes('strIngredient') && item[1] !== ''
  )
  const measure = Object.entries(data).filter((item) => item[0].includes('strMeasure') && item[1].length > 1)
  const measureIngredients = ingredients.map((item) => {
    if (measure.length === 1) return [...item, measure[0][1]]
    return [...item, measure[0][1]]
  })
  return (
    <div className={styles.container}>
      <picture>
        <source srcSet={data.strMealThumb} type="image/webp" />
        <img
          src={data.strMealThumb}
          alt={data.strMeal}
          width="100%"
          className={styles.image}
        />
      </picture>
      <h1>{data.strMeal}</h1>
      <div>
        <h3 className={styles.title}>Ingredients</h3>
        <ul className={styles.ulLabel}>
          {measureIngredients.map((item, i) => (
            <label htmlFor={item[0]} key={i} className={styles.label}>
              <Checkbox
                id={item[0]}
                value={item}
                color="success"
              />
              <p className={styles.textIngredient}>{`${item[1]} - ${item[2]} `}</p>
            </label>
          ))}
        </ul>
        <h3 className={styles.title}>Instructions</h3>
        <p className={styles.instructProgress}>{data.strInstructions}</p>
      </div>
      <Link href={`/drinks/${data.idMeal}/in-progress`} >
        <Button size="large" sx={{mb: "80px"}}variant="contained">Finish Recipe</Button>
      </Link>
    </div>
  )
}

export async function getStaticPaths() {
  const data = await foodsApi()
  const paths = data.meals.map((item: IItem) => ({
    params: {
      id: item.idMeal,
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: IParams) {
  const data = await foodsApi()
  const res = data.meals.find((item: IItem) => item.idMeal === params.id)
  return {
    props: {
      data: res,
    },
  }
}
