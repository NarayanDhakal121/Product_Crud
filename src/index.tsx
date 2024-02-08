import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from "react-query";


const colors={
  navColor:{
    900:'#D9D9D9'
  },

"product": {
  200:'#6E9CC7'
},

"sidebar": {
500:'#6E9CC7'
},
"list": {
  900:'#ffffff'
  },

}


const theme= extendTheme({colors})

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
  <ChakraProvider theme={theme}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ChakraProvider>
  </QueryClientProvider>

);

