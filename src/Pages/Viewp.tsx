import React from 'react';
import { useMutation } from 'react-query';
import { Table, Tr, Th, Thead, Tbody, Td, VStack, Image, Text, Flex, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import useProducts from '../useProductQuery/useProduct'; 
import Product from '../Component/Interface';
import axios from 'axios';

const deleteProduct = async (id: number) => {
  const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
  if (response.status === 200) {
    console.log('Product deleted successfully');
  } else {
    throw new Error('Failed to delete product');
  }
}

const Viewp = () => {
  const { data, isLoading, error } = useProducts(); 
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

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  }

  return (
    <VStack spacing={4} align="stretch">
      <Table variant="simple" bg={'red.200'}>
        <Thead>
          <Tr>
             <Th>s.n</Th>
            <Th>Title</Th>
            <Th>Image</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Category</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody bg={'gray.400'}>
          {data?.map((product:Product , index: number) =>(
            <Tr key={product.id}>
              <Td>{index + 1}</Td>
              <Td>{product.title}</Td>
              <Td><Image src={product.image} alt={product.title} /></Td>
              <Td>{product.description}</Td>
              <Td>{product.price}</Td>
              <Td>{product.category}</Td>
              <Td>
                <Flex gap={'1'}>
                  <Link to={`/create/${product.id}`}>
                    <IconButton aria-label='Edit product' icon={<EditIcon />} />
                  </Link>
                  <IconButton onClick={() => handleDelete(product.id)} aria-label='Delete product' icon={<DeleteIcon />} />
                  <Link to={`/`}>
                    <IconButton aria-label='View product' icon={<ViewIcon />} />
                  </Link>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
}

export default Viewp;
