import { useQuery } from 'react-query';

const getProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  return data;
};

const useProducts = () => {
  return useQuery('products', getProducts);
};

export default useProducts;
