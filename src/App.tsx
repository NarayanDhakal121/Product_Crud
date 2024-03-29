import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import ProductForm from './Pages/ProductForm'
import Layout from './Layout/Layout'
import Viewp from './Pages/ProductTable'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>} />
          <Route path='/create' element={<ProductForm/>} />
          <Route path='/update/:id' element={<ProductForm/>} />
          <Route path='/view' element={<ProductTable/>} />
       
        </Routes>
    </BrowserRouter>
  )
}

export default App
