import { Box, Container } from '@mui/system'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import itemStyles from './index.module.css'

interface PropsI {
  title: string
  data: any[] | IData[]
}
interface IData {
  strMeal: string
  strMealThumb: string
}

export default function ItensMap(props: PropsI) {
  const { title, data } = props
  const [type, setType] = useState<string>('')

  useEffect(() => {
    if (title === 'foods') return setType('Meal')
    setType('Drink')
  }, [])
  // console.log(data)

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          m: 0,
        }}
      >
        {data &&
          type &&
          data.map((item, index) => (
            <Link 
            key={index} 
            href={`/${title}/${item[`id${type}`]}`}
            >
            <div className={itemStyles.link}>
              {/* <p>{item + `.id${type}`}</p> */}
              <img
                src={item[`str${type}Thumb`]}
                alt={item[`str${type}`]}
                width="230px"
                className={itemStyles.image}
                />
              <p>{item[`str${type}`]}</p>
              {/* <p>{item.strMeal}</p> */}
            </div>
                </Link>
          ))}
      </Box>
    </>
  )
}
