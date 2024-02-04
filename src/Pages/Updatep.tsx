import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { VStack, Text, Button, Input, Card } from '@chakra-ui/react';
import axios from 'axios';

interface Product {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const updateProduct = async (productId: number, updatedProductData: Product) => {
  try {
    const response = await axios.put(`https://fakestoreapi.com/products/${productId}`, updatedProductData);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to update product. Server responded with status ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to update product:', error);
  }
};

const Updatep = () => {
  const [formData, setFormData] = useState<Product>({
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  });

  const mutation = useMutation((updatedProductData: Product) => updateProduct(7, updatedProductData), {
    onSuccess: () => {
      console.log('Product updated successfully!');
    },
  });

  const handleUpdateProduct = () => {
    const updatedProductData: Product = {
      title: 'test product',
      price: 13.5,
      description: 'lorem ipsum set',
      image: 'https://i.pravatar.cc',
      category: 'electronic',
    };

    mutation.mutate(updatedProductData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Card p={4}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl">Update Product</Text>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Product Title"
        />
        <Input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Product Price"
        />
        <Input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
        />
        <Input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Product Image URL"
        />
        <Input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Product Category"
        />
        <Button onClick={handleUpdateProduct} isLoading={mutation.isLoading}>
          {mutation.isLoading ? 'Updating...' : 'Update Product'}
        </Button>
      </VStack>
    </Card>
  );
};

export default Updatep;
  