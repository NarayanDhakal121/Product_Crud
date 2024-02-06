
import { Outlet } from 'react-router-dom'
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import { Grid , GridItem} from '@chakra-ui/react'
import Dashboard from '../Pages/Dashboard'

const Layout = () => {
  return (
<Grid templateColumns= 'repeat(6 , 1fr)' bg={'list.900'}>

  <GridItem as={'aside'}
  colSpan={{base:6, lg:2, xl:1}}
  bg={'sidebar.500'}
  minH={{lg:'100vh'}}
  p={{base:'20px', lg:4, xl:'30px'}} >
 <Sidebar/>
  </GridItem>


{/* ----for navbar ----*/}

<GridItem 
as={'nav'}
colSpan={{base:6, lg:4, xl:5}}
p={'40px'}>
  <Outlet/>
<Navbar/>
<Dashboard/>
</GridItem>

</Grid>

 
  )
}

export default Layout
