import MyGlobalContext, { IMyContext } from '../context/MyContext'
import { useContext } from 'react'
// import { Container } from '@mui/system'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/router'

export default function Profile() {
  const value = useContext(MyGlobalContext) as IMyContext
  const { profile } = value
  const router = useRouter()

  return (
    <>
      <h2>Hello, {profile.email as string}</h2>
      <h3>This is your profile</h3>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '75%',
          margin: 'auto ',
          alignItems: 'stretch',
          maxWidth: '350px',
          justifyContent: 'center',
        }}
      >
        <br />
        <Button onClick={() => router.push('/recipesdone')} variant="outlined">
          Recipes Done
        </Button>
        <br />
        <Button onClick={() => router.push('/favorites')} variant="outlined">
          Favorites
        </Button>
        <br />
        <Button
          onClick={() => router.push('https://github.com/NicolasHubner')}
          variant="outlined"
        >
          Nicolas GitHub
        </Button>
        <br />
        <Button
          onClick={() =>
            router.push('https://www.linkedin.com/in/nicolashubner/')
          }
          variant="outlined"
        >
          Nicolas Linkedin
        </Button>
      </Box>
    </>
  )
}
