import React, { useEffect, useState } from 'react';
import { useGetPorductsQuery } from '../services/products'
import ProductsGrid from '../components/grids/ProductsGrid';
import { Button, Text } from '@chakra-ui/react';
import { TProduct } from '../services/types/products';

type Props = {}

const ProductsPage: React.FC<Props> = () => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [products, setProducts] = useState<TProduct[]>([])
  const { data, error, isLoading, isSuccess } = useGetPorductsQuery(pageNo);
  useEffect(() => {
    if (data)
      setProducts(prev => [...prev, ...data.products]);
  }, [data]);

  return (
    <>
      <ProductsGrid data={products} error={error} isLoading={isLoading} isSuccess={isSuccess} />
      <br />
      <center>
        {
          isSuccess && data.products.length >= 15 ?
            <Button isDisabled={isLoading} onClick={() => setPageNo(pageNo + 1)}>
              {isLoading ? "Getting data..." : "Load more"}
            </Button>
            :
            <Text color='gray.700'>Yay you have reached end</Text>
        }
      </center>
    </>
  )
}

export default ProductsPage