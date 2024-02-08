import React from 'react';
import { VStack, Image, Divider ,Text, Card, CardHeader, CardBody, CardFooter, SimpleGrid, Flex,  Badge } from '@chakra-ui/react';
import axios from 'axios';
import Product from '../Component/Interface';
import useProducts from '../useProductQuery/useProduct';


const Dashboard = () => {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>An error has occurred</Text>;


  return (
    <VStack spacing={4} align="stretch">
      <SimpleGrid spacing={'10'} minChildWidth={'300px'}>
        {data?.map((product:Product)=> (
          <Card key={product.id} borderTop={'8px'} borderColor={'green.400'} bg={'white'} alignItems={'center'}>
            <CardHeader>
              <Flex gap='5'>
                <Image src={product.image} alt='img' boxSize="100px" objectFit='cover' minH={'40'} />
              </Flex>
            </CardHeader>

            <CardBody >
              <VStack>
                <Text textAlign={'center'}>Category: <Badge colorScheme="green">{product.category}</Badge></Text>
                <Text>Name: {product.title}</Text>
                <Text>Description: {product.description}</Text>
              </VStack>
            </CardBody>

            <Divider />

            <CardFooter textAlign={'center'}>
              <Text>Price: {product.price}</Text>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </VStack>
  );
}

export default Dashboard;
