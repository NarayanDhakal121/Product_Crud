import React from 'react';
import { useQuery } from 'react-query';
import { VStack, Image, Divider, Button, HStack, Heading, Text, Card, CardHeader, CardBody, CardFooter, SimpleGrid, Flex, Box, Avatar, Badge } from '@chakra-ui/react';
import axios from 'axios';

interface Product {
  id: string;
  image: string;
  title: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const fetchProducts = async () => {
  const { data } = await axios.get('https://fakestoreapi.com/products');
  return data;
}

const Dashboard = () => {
  const { data, isLoading, error } = useQuery<Product[]>('products', fetchProducts);

  if (isLoading) return <Text>Loading...</Text>;
if (error) return <Text>An error has occurred: {(error as Error).message}</Text>;


  return (
    <VStack spacing={4} align="stretch">
      <SimpleGrid spacing={'10'} minChildWidth={'300px'}>
        {data?.map(product => (
          <Card key={product.id} borderTop={'8px'} borderColor={'green.400'} bg={'white'} alignItems={'center'}>
            <CardHeader>
              <Flex gap='5'>
                <Image src={product.image} alt='img' boxSize="100px" objectFit='cover' minH={'40'} />
              </Flex>
            </CardHeader>

            <CardBody bg={'gray.200'}>
              <VStack>
                <Text textAlign={'center'}>Category: <Badge colorScheme="green">{product.category}</Badge></Text>
                <Text>Name: {product.title}</Text>
                <Text>Description: {product.description}</Text>
              </VStack>
            </CardBody>

            <Divider borderColor={'gray.200'} />

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
