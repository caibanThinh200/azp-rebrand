"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

const FallbackImage: React.FC<ImageProps> = ({ src, ...rest }) => {
  const [imageUrl, setImageUrl] = useState(
    src || "/images/placeholder-image.svg"
  );

  return (
    <Image
      {...rest}
      src={imageUrl}
      onError={() => {
        setImageUrl("/images/placeholder-image.svg");
      }}
    />
  );
};

export default FallbackImage;
