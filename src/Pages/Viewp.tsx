import React from 'react';
import { useQuery, useMutation } from 'react-query';
import { Table, Tr, Th, Thead, Tbody, Td, VStack, Image, Text, Flex, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

const fetchProducts = async () => {
  const { data } = await axios.get('https://fakestoreapi.com/products');
  return data;
}

const deleteProduct = async (id: string) => {
  const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
  if (response.status === 200) {
    console.log('Product deleted successfully');
  } else {
    throw new Error('Failed to delete product');
  }
}

const Viewp = () => {
  const { data, isLoading, error } = useQuery<Product[]>('products', fetchProducts);
  const mutation = useMutation(deleteProduct, {
    onSuccess: () => {
      console.log('Product deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting the product:', error);
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>An error has occurred: {(error as Error).message}</Text>;

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  }

  return (
    <VStack spacing={4} align="stretch">
      <Table variant="simple" bg={'red.200'}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Title</Th>
            <Th>Image</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Category</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody bg={'gray.400'}>
          {data?.map((product, index) =>
            <Tr key={product.id}>
              <Td>{index + 1}</Td>
              <Td>{product.title}</Td>
              <Td><Image src={product.image} alt={product.title} /></Td>
              <Td>{product.description}</Td>
              <Td>{product.price}</Td>
              <Td>{product.category}</Td>
              <Td>
                <Flex gap={'1'}>
                  <Link to={`/update/${product.id}`}>
                    <IconButton aria-label='Edit product' icon={<EditIcon />} />
                  </Link>
                  <IconButton onClick={() => handleDelete(product.id)} aria-label='Delete product' icon={<DeleteIcon />} />
                  <Link to={'/'}>
                    <IconButton aria-label='View product' icon={<ViewIcon />} />
                  </Link>
                </Flex>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </VStack>
  );
}

export default Viewp;
