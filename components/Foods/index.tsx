import Container from '@mui/material/Container'
import ItensMap from '../ItensMap'

interface IFoods {
  data: any
}

export default function Foods(props: IFoods) {
  const { data } = props
  return (
    <>
      <Container maxWidth="lg">
        <ItensMap title="foods" data={data.meals} />
      </Container>
    </>
  )
}
