import { Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import MyGlobalContext, { IMyContext } from '../context/MyContext'

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
                  ml: '30px',
                  p: '5px',
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
            Hey there you haven`t end any recipe, <br /> check the{'   '}
            <b>RECIPES APP </b>
            and select someone to do! =)
          </Typography>
        )}
      </Container>
    </>
  )
}
