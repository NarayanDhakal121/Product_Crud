import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Table, Tr, Th, Thead, Tbody, Td, VStack, Image, Text, Flex, IconButton, Checkbox } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const PAGE_SIZE = 12; 

const deleteProduct = async (id: number) => {
  const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
  if (response.status === 200) {
    console.log('Product deleted successfully');
  } else {
    throw new Error('Failed to delete product');
  }
}

const ProductTable= () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, error } = useQuery(['products', currentPage], () => {
    return axios.get(`https://fakestoreapi.com/products?limit=${PAGE_SIZE}&offset=${currentPage * PAGE_SIZE}`)
      .then((res) => res.data);
  }); 

  const mutation = useMutation(deleteProduct, {
    onSuccess: () => {
      console.log('Product deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting the product:', error);
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  }

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>An error has occurred: {(error as Error).message}</Text>;

  return (
    <VStack spacing={4} align="stretch">
      <Checkbox>Select</Checkbox>
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
          {data?.map((product: any, index: number) => (
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
      <ReactPaginate
        pageCount={5} 
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </VStack>
  );
}

export default ProductTable;
