import React from 'react'
import { Flex, Heading, Spacer, HStack, Avatar, Text, Button} from '@chakra-ui/react'

const Navbar = () => {
  return (
    <>
    <Flex as={'nav'}
    bg={'navColor.900'}
    p={'10px'}
    mb={'40px'}
    alignItems={'center'}>
      <Heading as={'h1'} >
  Products Page
      </Heading>
 
    <Spacer/>

    <HStack spacing={'40px'}>
   <Avatar/>
   <Text>Narayan</Text>
   <Button>Logout</Button>
    </HStack>

    </Flex>
    </>
  )
}

export default Navbar