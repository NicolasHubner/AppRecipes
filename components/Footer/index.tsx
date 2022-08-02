import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import MyGlobalContext, { IMyContext } from '../../context/MyContext'
import { useContext } from 'react'
import { IconButton } from '@mui/material'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/NicolasHubner">
        Nicolas Hubner
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function StickyFooter() {
  const value = useContext(MyGlobalContext) as IMyContext
  const { setType } = value

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '10vh',
        width: '100%',
      }}
      position="fixed"
      bottom="0px"
    >
      <Box
        component="footer"
        sx={{
          py: 1,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              mb: 1,
            }}
          >
            <IconButton onClick={() => setType('Comidas')}>
              <img
                src="https://img.icons8.com/wired/64/000000/salami-pizza.png"
                width="30px"
                height="30px"
              />
            </IconButton>
            <IconButton onClick={() => setType('Bebidas')}>
              <img
                src="https://img.icons8.com/wired/64/000000/cocktail.png"
                width="30px"
                height="30px"
              />
            </IconButton>
          </Box>
          <Copyright />
        </Container>
      </Box>
    </Box>
  )
}
