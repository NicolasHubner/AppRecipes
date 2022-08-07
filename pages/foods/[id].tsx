import { Box, Typography, Button, IconButton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { foodsApi } from '../../helpers/functions/foodAndCocktailApi'
import styles from './id.module.css'
import favorite from '../../images/favorite.svg'

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
        <source srcSet={data.strMealThumb} type="image/webp" />
        <img
          src={data.strMealThumb}
          alt={data.strMeal}
          width="100%"
          className={styles.image}
        />
      </picture>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: '50px',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" sx={{ m: 2, textAlign: 'start' }}>
          {data.strMeal}
        </Typography>
        <IconButton
          onClick={() =>
            alert(`The recipe ${data.strMeal} was add to favorites`)
          }
        >
          <Image src={favorite} alt="favorite" width="30px" height="30px" />
        </IconButton>
      </Box>

      <div>
        <h3 className={styles.title}>Ingredients</h3>
        <ul className={styles.ul}>
          {measureIngredients.map((item, i) => (
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
      <Link href={`/foods/${data.idMeal}/in-progress`}>
        <Button
          size="large"
          sx={{
            backgroundColor: 'rgb(240, 165, 26)',
            width: '280px',
            height: '50px',
            color: 'black',
            mb: '80px',
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
