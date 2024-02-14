import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { VStack, Text, Button, Input, Card, Box, Flex } from '@chakra-ui/react';
import axios from 'axios';
import Product from '../Component/Interface';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const ProductForm = ({ product }: { product?: Product }) => {
  const { register, handleSubmit, reset } = useForm<Product>({ defaultValues: product });
  const mutation = useMutation((newProductData: Product) => addOrUpdateProduct(newProductData), {
    onSuccess: () => {
      console.log('Product updated/added successfully!');
      reset();
    },
  });

  const onSubmit = (data: Product) => {
    const currentDate = new Date();
    data.created_at = currentDate.toISOString(); 
  };

  const addOrUpdateProduct = async (productData: Product) => {
    try {
      if (productData.id) {
        const response = await axios.put(`https://fakestoreapi.com/products/${productData.id}`, productData);
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(`Failed to update product ${response.status}`);
        }
      } else {
        const response = await axios.post('https://fakestoreapi.com/products', productData);
        if (response.status === 201) {
          return response.data;
        } else {
          throw new Error(`Failed to add product ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Failed to update/add product:', error);
    }
  };

  return (
    <Card p={4}>
      <VStack spacing={4} align="stretch" as="form" onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="xl">{product ? 'Update Product' : 'Add Product'}</Text>
        <Input {...register('title')} placeholder="Product Title" />
        <Input type="number" {...register('price')} placeholder="Product Price" />
        <Input {...register('description')} placeholder="Product Description" />
        <Input {...register('image')} placeholder="Product Image URL" />
        <Input {...register('category')} placeholder="Product Category" />
        {!product && (
          <Box w="100%">
            <DatePicker
              selected={new Date()} 
              onChange={(date: Date) => {
              }}
              dateFormat="MM/dd/yyyy"
            />
          </Box>
        )}
        <Flex justify="space-between" w="100%">
          <Button type="submit" isLoading={mutation.isLoading}>
            {mutation.isLoading ? 'Updating...' : product ? 'Update Product' : 'Add Product'}
          </Button>
          <Button colorScheme="blue" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
        </Flex>
      </VStack>
    </Card>
  );
};

export default ProductForm;
