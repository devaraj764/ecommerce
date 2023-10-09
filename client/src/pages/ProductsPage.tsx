import React, { useEffect, useState } from 'react';
import { useGetPorductsQuery } from '../services/products'
import ProductsGrid from '../components/grids/ProductsGrid';
import { Box, Input, Text } from '@chakra-ui/react';
import { TProduct } from '../services/types/products';
import ProductsFilter from '../components/ProductsFilter';
import NotItemsFound from '../components/common/NotItemsFound';

type Props = {}

const ProductsPage: React.FC<Props> = () => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [hardReset, setHardReset] = useState(false)
  const [query, setQuery] = useState<string>(localStorage.getItem('query') || '');
  const [searchInput, setSearchInput] = useState<string>('');
  const [search, setSearch] = useState('')
  const { data, error, isLoading, isSuccess } = useGetPorductsQuery({ pageNo, query, search });

  useEffect(() => {
    if (data) {
      console.log(hardReset)
      if (hardReset) setProducts(data.products)
      else setProducts(prev => [...prev, ...data.products]);
    }
    setHardReset(false)
  }, [data]);

  const applyFilter = (query: string) => {
    setHardReset(true);
    setPageNo(1);
    setQuery(query);
  }

  useEffect(() => {
    function handleScroll() {
      const distanceFromBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;

      if (distanceFromBottom <= 300) {
        setPageNo(pageNo + 1);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== '') {
        setHardReset(true);
        setPageNo(1);
      }
      setSearch(searchInput)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [searchInput])

  return (
    <Box pb='50px'>
      <ProductsFilter
        inputElement={
          <Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} size={'lg'} bg='#fff' type='text' placeholder='Search..' maxW='300px' />
        }
        applyFilter={applyFilter} />
      <br />
      <ProductsGrid data={products} error={error} isLoading={isLoading} isSuccess={isSuccess} />
      <br />
      <center>
        {
          (isSuccess && data.products.length === 0) &&
          (query === '' || search === '') &&
          <Text color='gray.700'>You have reached end</Text>
        }
        {
          products.length === 0 && <NotItemsFound message='😢  No Products Found' />
        }
      </center>
    </Box>
  )
}

export default ProductsPage