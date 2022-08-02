import Container from '@mui/material/Container'
import ItensMap from '../ItensMap'

interface IDrinks {
  data: any
}

export default function Drinks(props: IDrinks) {
  const { data } = props
  // console.log(data.drinks)
  return (
    <>
      <Container maxWidth="lg">
        <ItensMap title="drinks" data={data.drinks} />
      </Container>
    </>
  )
}
