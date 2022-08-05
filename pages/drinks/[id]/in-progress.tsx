import { Button, Checkbox } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import MyGlobalContext, {
  IDoneRecipes,
  IMyContext,
} from '../../../context/MyContext'
import { cockTailApi } from '../../../helpers/functions/foodAndCocktailApi'
import styles from '../../foods/id.module.css'

interface IProps {
  data: {
    idDrink: string
    strDrink: string
    strInstructions: string
    strDrinkThumb: string
    strAlcoholic: string
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

export default function InProgress(props: IProps) {
  const { data } = props
  const value = useContext(MyGlobalContext) as IMyContext
  const { setRecipes, doneRecipes } = value
  const ingredients = Object.entries(data).filter((item) =>
    item[1] !== null && ' ' ? item[0].includes('strIngredient') : false
  )

  const measure = Object.entries(data).filter(
    (item) => item[0].includes('strMeasure') && item[1] !== null
  )

  const measureIngredients = ingredients.map((item) => {
    if (measure.length === 1) return [...item, measure[0][1]]
    return [...item, measure[0][1]]
  })
  const router = useRouter()
  // console.log(router)

  const handleAddRecipes = () => {
    const recipe = {
      name: data.strDrink,
      thumb: data.strDrinkThumb,
      type: data.strAlcoholic,
      data: {
        dia: new Date().getDate(),
        mes: new Date().getMonth() + 1,
        ano: new Date().getFullYear(),
      },
      id: data.idDrink,
      path: router.asPath,
    }
    const newArray = []
    newArray.push(recipe)
    if (!doneRecipes) return setRecipes(newArray)
    if (doneRecipes) return setRecipes((prev: any) => [...prev, recipe])
  }

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
        <ul className={styles.ulLabel}>
          {measureIngredients.map((item, i) => (
            <label htmlFor={item[0]} key={i} className={styles.label}>
              <Checkbox id={item[0]} value={item} color="success" />
              <p
                className={styles.textIngredient}
              >{`${item[1]} - ${item[2]}`}</p>
            </label>
          ))}
        </ul>
        <h3 className={styles.title}>Instructions</h3>
        <p className={styles.instructProgress}>{data.strInstructions}</p>
      </div>
      <Link href={`/recipesdone`}>
        <Button
          onClick={() => handleAddRecipes()}
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
          Finish Recipe
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
