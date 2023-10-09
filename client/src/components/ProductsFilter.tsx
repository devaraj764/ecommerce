import { Button, Card, CardBody, Flex, HStack, Text, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Tag } from '@chakra-ui/react'
import React from 'react'
import AnimatedDiv from './common/AnimatedDiv'
import { AiFillFilter } from 'react-icons/ai'

type Props = {
    applyFilter: (query: string) => void
    inputElement: React.ReactNode
}

type FilterType = {
    brands: string[],
    sortBy: string,
    genders: string[]
    priceRange: number[]
}

const ProductsFilter = ({ applyFilter, inputElement }: Props) => {
    const initialData = {
        brands: [],
        sortBy: '',
        genders: [],
        priceRange: [0, 10000]
    };
    const [filters, setFilters] = React.useState<FilterType>(initialData)
    const [isFilterVisible, setFilterVisible] = React.useState(false);
    const brands = ['NIKE', 'HUSHPUPPIES', 'ADIDAS', 'Reebok', 'Vans'];
    const gender = ["MEN", "WOMEN", "KIDS"];
    const sort = ['Newly Added', "Most Rated"];

    const handleApplyChanges = (filters: FilterType) => {
        var query: string = '';
        const brandQ = filters.brands.join(',');
        const gendersQ = filters.genders.join(',');
        const priceRangeQ = filters.priceRange.join(',');
        if (brandQ !== '') query += `brands=${brandQ}&`;
        if (gendersQ !== '') query += `genders=${gendersQ}&`;
        if (priceRangeQ !== '') query += `priceRange=${priceRangeQ}&`;
        if (filters.sortBy !== '') query = query + `sortBy=${filters.sortBy.toLowerCase().replace(' ', '')}&`;
        localStorage.setItem('query', query);
        localStorage.setItem('query-json', JSON.stringify(filters));
        applyFilter(query);
        setFilterVisible(false);
    }

    const updateBrands = (brand: string, action: string) => {
        var newBrands: string[];
        if (action === 'add') {
            newBrands = [...filters.brands, brand]
        } else {
            newBrands = filters.brands.filter(item => item !== brand)
        }
        setFilters(prev => ({ ...prev, brands: newBrands }))
    }

    const updateGender = (gender: string, action: string) => {
        var newBrands: string[];
        if (action === 'add') {
            newBrands = [...filters.genders, gender]
        } else {
            newBrands = filters.genders.filter(item => item !== gender)
        }
        setFilters(prev => ({ ...prev, genders: newBrands }))
    }

    const hanldeRangeSlider = (newRange: number[]) => {
        setFilters(prev => ({ ...prev, priceRange: newRange }));
    }

    const reset = () => {
        setFilters(initialData);
        applyFilter('');
        localStorage.removeItem('query');
        localStorage.removeItem('query-json');
        setFilterVisible(false);
    }

    React.useEffect(() => {
        const queryJson = localStorage.getItem('query-json') || '';
        if(queryJson !== ''){
            setFilters(JSON.parse(queryJson))
        }
    }, []);
    

    return (
        <>
            <HStack justifyContent={'space-between'}>
                {inputElement}
                {
                    !isFilterVisible &&
                    <Button onClick={() => setFilterVisible(true)} leftIcon={<AiFillFilter size='20px' />}>Filter</Button>
                }
            </HStack>
            <AnimatedDiv toogle={isFilterVisible}>
                <Card mt='3'>
                    <CardBody>
                        <Text fontWeight={'700'} fontSize='16px' color='gray.600'>Sorting Filters:</Text>
                        <Flex flexWrap={'wrap'} my='2' mb='5' alignItems={'center'} gap='3'>
                            {sort.map((item) => (
                                <Button
                                    key={item}
                                    colorScheme={
                                        filters.sortBy.toLowerCase().replace(' ', '') === item.toLowerCase().replace(' ', '')
                                            ? 'messenger' : 'gray'}
                                    onClick={() => setFilters(prev => ({ ...prev, sortBy: item }))}
                                >
                                    {item}
                                </Button>
                            ))}
                        </Flex>
                        <Text fontWeight={'700'} fontSize='16px' color='gray.600'>Gender:</Text>
                        <Flex flexWrap={'wrap'} my='2' mb='5' alignItems={'center'} gap='3'>
                            {gender.map((item) => (
                                filters.genders.includes(item) ?
                                    <Button key={item}
                                        variant={'outline'}
                                        colorScheme={'messenger'}
                                        onClick={() => updateGender(item, 'remove')}
                                    >
                                        {item}
                                    </Button> :
                                    <Button key={item}
                                        colorScheme={'gray'}
                                        variant={'outline'}
                                        onClick={() => updateGender(item, 'add')}
                                    >
                                        {item}
                                    </Button>
                            ))}
                        </Flex>
                        <Text fontWeight={'700'} fontSize='16px' color='gray.600'>Brands:</Text>
                        <Flex flexWrap={'wrap'} my='2' mb='6' alignItems={'center'} gap='3'>
                            {brands.map((item) => (
                                filters.brands.includes(item) ?
                                    <Button key={item}
                                        variant={'outline'}
                                        colorScheme={'messenger'}
                                        onClick={() => updateBrands(item, 'remove')}
                                    >
                                        {item}
                                    </Button> :
                                    <Button key={item}
                                        colorScheme={'gray'}
                                        variant={'outline'}
                                        onClick={() => updateBrands(item, 'add')}
                                    >
                                        {item}
                                    </Button>
                            ))}
                        </Flex>
                        <HStack gap='20px' >
                            <Text fontWeight={'700'} fontSize='16px' color='gray.600'>Pricing Filters:</Text>
                            <Tag colorScheme='purple' fontWeight={'700'} fontSize='20px'>{filters.priceRange[0]} to {filters.priceRange[1]}</Tag>
                        </HStack>
                        <RangeSlider mt='3' onChange={hanldeRangeSlider} defaultValue={filters.priceRange} min={0} max={10000} step={100} maxW='500px'>
                            <RangeSliderTrack bg='blue.200'>
                                <RangeSliderFilledTrack bg='blue.500' />
                            </RangeSliderTrack>
                            <RangeSliderThumb boxSize={6} index={0} />
                            <RangeSliderThumb boxSize={6} index={1} />
                        </RangeSlider>
                        <HStack mt='3' justifyContent={'flex-end'} w='full'>
                            <Button onClick={() => setFilterVisible(false)}>Cancel</Button>
                            <Button onClick={reset} colorScheme='red'>Clear Filters</Button>
                            <Button onClick={() => handleApplyChanges(filters)} colorScheme='green'>Apply Changes</Button>
                        </HStack>
                    </CardBody>
                </Card>
            </AnimatedDiv >
        </>
    )
}

export default ProductsFilter;