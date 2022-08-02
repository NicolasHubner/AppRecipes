import { Button } from '@mui/material'
import Link from 'next/link'
import { foodsApi } from '../../helpers/functions/foodAndCocktailApi'
import styles from './id.module.css'

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

export default function FoodsID(props: IProps) {
  const { data } = props
  const ingredients = Object.entries(data).filter(
    (item) => item[0].includes('strIngredient') && item[1] !== ''
  )
  const mensuare = Object.entries(data).filter((item) => item[0].includes('strMeasure') && item[1].length > 1)
  const mensuareIngredients = ingredients.map((item, i) => [...item, mensuare[i][1]])
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
        <ul className={styles.ul}>
          {mensuareIngredients.map((item, i) => (
            <li className={styles.li} key={i}>
              - {`${item[1]} - ${item[2]} `}
            </li>
          ))}
        </ul>
        <h3 className={styles.title}>Instructions</h3>
        <p className={styles.instruct}>{data.strInstructions}</p>
      </div>
      <h3 className={styles.title}>Video</h3>
      <iframe
        width="100%"
        height="315"
        src={data.strYoutube.replace('watch?v=', 'embed/')}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.video}
      ></iframe>
       <Link href={`/drinks/${data.idMeal}/in-progress`} >
          <Button size="large" sx={{mb: "80px"}}variant="contained">Start Recipe</Button>
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
