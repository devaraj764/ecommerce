import { Image } from '@chakra-ui/react';
import { useState } from 'react';
import React from 'react'

const ImageWithFallback = ({ src, fallbackSrc, ...props }: any) => {
    const [imageSrc, setImageSrc] = useState(src);

    const handleImageError = () => {
        // If the image fails to load, set the source to the fallback image
        setImageSrc(fallbackSrc);
    };

    React.useEffect(()=>{
        if(src) setImageSrc(src);
    }, [src])

    return (
        <Image
            src={imageSrc || ''}
            onError={handleImageError}
            {...props}
        />
    );
};

export default ImageWithFallback;
