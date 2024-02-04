import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Createp from './Pages/Createp'
import Updatep from './Pages/Updatep'
import Layout from './Layout/Layout'
import Viewp from './Pages/Viewp'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>} />
          <Route path='/create' element={<Createp />} />
          <Route path='/update/:id' element={<Updatep />} />
          <Route path='/view' element={<Viewp/>} />
       
        </Routes>
    </BrowserRouter>
  )
}

export default App
