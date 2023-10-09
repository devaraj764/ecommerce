import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import Navbar from './components/Navbar'
import WishlistPage from './pages/WishlistPage'
import OrdersPage from './pages/OrdersPage'
import { Container } from '@chakra-ui/react'
import BottomNavbar from './components/BottomNavbar'

type Props = {}

const App: React.FC<Props> = () => {
  return (
    <div className='App'>
      <Navbar />
      <Container maxW='container.xl'>
        <Routes>
          <Route path='/' Component={ProductsPage} />
          <Route path='/product/:id' Component={ProductsPage} />
          <Route path='/cart' Component={CartPage} />
          <Route path='/wishlist' Component={WishlistPage} />
          <Route path='/orders' Component={OrdersPage} />
        </Routes>
      </Container>
      <BottomNavbar />
    </div>
  )
}

export default App