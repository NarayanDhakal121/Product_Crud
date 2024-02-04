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

const addProduct = async (newProductData: Product) => {
  try {
    const response = await axios.post('https://fakestoreapi.com/products', newProductData);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Failed to add product. Server responded with status ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to add product:', error);
    throw new Error('Failed to add product. Check console for details.');
  }
};

const Createp = () => {
  const [formData, setFormData] = useState<Product>({
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  });

  const mutation = useMutation((newProductData: Product) => addProduct(newProductData), {
    onSuccess: (data) => {
      console.log('Product added successfully:', data);
      setFormData({
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
      });
    },
    onError: (error) => {
      console.error('Error adding product:', error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    mutation.mutate(formData);
  };

  return (
    <Card p={4}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl">Add a New Product</Text>
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
        <Button onClick={handleAddProduct} isLoading={mutation.isLoading}>
          Add Product
        </Button>
      </VStack>
    </Card>
  );
};

export default Createp;
