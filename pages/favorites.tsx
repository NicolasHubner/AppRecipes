import { Container, Box, Typography } from '@mui/material'
import router from 'next/router'
import { useContext } from 'react'
import MyGlobalContext, { IMyContext } from '../context/MyContext'

export default function Favorites() {
  const value = useContext(MyGlobalContext) as IMyContext
  const { favorites } = value
  return (
    <>
      <h1>Favorites Recipes</h1>
      <Container maxWidth="lg">
        {favorites.length > 0 ? (
          favorites.map((item, index) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: '#eceff1',
                borderRadius: '5px',
                boxShadow: '3px 4px 8px rgba(0, 0, 0, 0.5)',
                mt: '10px',
                alignItems: 'center',
              }}
              key={index}
              onClick={() => router.push(item.path)}
            >
              <img src={item.thumb} alt={item.name} width="180px" />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%',
                  p: '5px',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h4">{item.name}</Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="h6" sx={{ mt: '40px' }}>
            Hey there! You don&apos;t have any favorite recipes as of yet!
          </Typography>
        )}
      </Container>
    </>
  )
}
