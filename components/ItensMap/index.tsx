import { TextField } from '@mui/material'
import { Box, Container } from '@mui/system'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
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
  const [search, setSearch] = useState(data)

  useEffect(() => {
    if (title === 'foods') return setType('Meal')
    setType('Drink')
  }, [])

  // useEffect(() => {

  // }, )

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.value)
    const { value } = e.target
    setTimeout(
      () =>
        setSearch(
          data.filter((item) =>
            item[`str${type}`].toLowerCase().includes(value)
          )
        ),
      500
    )
  }

  return (
    <>
      <TextField
        sx={{ width: '70%', maxWidth: '400px', mb: '20px' }}
        id="standard-basic"
        label="Search your Recipe..."
        variant="standard"
        onChange={(e) => handleChange(e)}
      />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          m: 0,
          mb: '100px',
        }}
      >
        {data &&
          type &&
          search.map((item, index) => (
            <Link key={index} href={`/${title}/${item[`id${type}`]}`}>
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
