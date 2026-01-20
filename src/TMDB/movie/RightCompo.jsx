import OthInfo from './OthInfo'
import Companies from '../oth/Companies'
import { Box } from '@mui/material'

function RightCompo({movie, type}) {
  return (
    <Box>
    <OthInfo movie={movie} type={type} />
    <Companies movie={movie} type={type} />
    </Box>
  )
}

export default RightCompo