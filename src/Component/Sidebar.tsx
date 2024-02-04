import React from 'react'
import { List , ListIcon,ListItem} from '@chakra-ui/react'
import { ViewIcon, CalendarIcon, EditIcon} from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
   <>
   <List  color={'white'} fontSize={'1.2em'} spacing={4}>
    <ListItem>
      <NavLink to='/'>
        <ListIcon as={CalendarIcon} color={'white'}/>
        Dashboard
      </NavLink>
    </ListItem>   

    <ListItem>
      <NavLink to='/create'>
        <ListIcon as={EditIcon} color={'white'}/>
       Add product
      </NavLink>
    </ListItem>


    <ListItem>
      <NavLink to='/update/:id'>
        <ListIcon as={EditIcon} color={'white'}/>
        Update product
      </NavLink>
    </ListItem>
   
    <ListItem>
      <NavLink to='/view'>
        <ListIcon as={ViewIcon} color={'white'}/>
        view product
      </NavLink>
    </ListItem>

   
   </List>
   
   </>
  )
}

export default Sidebar