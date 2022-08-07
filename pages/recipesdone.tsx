import { Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import MyGlobalContext, { IMyContext } from '../context/MyContext'
import styles from './recipesDone.module.css'

export default function RecipesDone() {
  const value = useContext(MyGlobalContext) as IMyContext
  const { doneRecipes } = value
  const router = useRouter()
  // console.log(doneRecipes[0])
  return (
    <>
      <h1>Recipes Done</h1>
      <Container maxWidth="lg">
        {doneRecipes.length > 0 ? (
          doneRecipes.map((item, index) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: '#eceff1',
                // p: '5px',
                margin: '0 auto',
                maxWidth: '500px',
                borderRadius: '5px',
                boxShadow: '3px 4px 8px rgba(0, 0, 0, 0.5)',
                mt: '10px',
              }}
              key={index}
              onClick={() => router.push(item.path)}
            >
              <img src={item.thumb} alt={item.name} width="180px" />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  // ml: '30px',
                  p: '5px',
                  pr: '20px',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h6">{`End Date: ${item.data.mes}/${item.data.dia}/${item.data.ano}`}</Typography>
                <p>{item.type}</p>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="h6" sx={{ mt: '40px' }}>
            Hey there! You haven&apos;t finished any recipes yet, <br />{' '}
            <Link href="/receitas">
              <a className={styles.link}>click here</a>
            </Link>{' '}
            and select a recipe!
          </Typography>
        )}
      </Container>
    </>
  )
}
