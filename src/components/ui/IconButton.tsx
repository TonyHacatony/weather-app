import React from 'react';
import SquareImage, { ImageProps } from './SquareImage';

export interface IconButtonProps {
  onClick: () => void;
}

const IconButton = ({ onClick, imageLink, alt, size, title }: IconButtonProps & ImageProps) => {
  return (
    <button onClick={() => onClick()}>
      <SquareImage
        imageLink={imageLink}
        alt={alt}
        size={size}
        title={title}
      />
    </button>
  );
};

export default IconButton;
