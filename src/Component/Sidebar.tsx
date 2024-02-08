import React from 'react'
import { List , ListIcon,ListItem} from '@chakra-ui/react'
import { ViewIcon, CalendarIcon, EditIcon} from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
   <>
   <List  color={'list.900'} fontSize={'1.2em'} spacing={4}>
    <ListItem>
      <NavLink to='/'>
        <ListIcon as={CalendarIcon} color={'list.900'}/>
        Dashboard
      </NavLink>
    </ListItem>   

    <ListItem>
      <NavLink to='/create'>
        <ListIcon as={EditIcon} color={'list.900'}/>
       productForm
      </NavLink>
    </ListItem>
   
    <ListItem>
      <NavLink to='/view'>
        <ListIcon as={ViewIcon} color={'list.900'}/>
        view product
      </NavLink>
    </ListItem>

   
   </List>
   
   </>
  )
}

export default Sidebar