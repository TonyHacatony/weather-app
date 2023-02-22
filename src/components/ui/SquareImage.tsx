import React from 'react';
import { findDescription } from '../api/WeatherConditions';
import { createImgLink, isPropReady } from '../feature/Common';

interface WeatherIconProps {
  conditionCode?: number;
  isDay?: boolean; // default true
}

const defaultWeatherIconSize = 64;
export const WeatherIcon = ({ conditionCode, isDay }: WeatherIconProps) => {
  if (!isPropReady(conditionCode)) {
    return <SquareImage
      imageLink={undefined}
      alt={'Weather condition'}
      size={defaultWeatherIconSize}
      title={'Weather icon'}
    />
  }

  const isDayIcon = isDay === undefined ? true : isDay;
  return (
    <SquareImage
      imageLink={createImgLink(isDayIcon, conditionCode)}
      alt={'Weather condition'}
      size={defaultWeatherIconSize}
      title={findDescription(conditionCode, isDayIcon)}
    />
  );
}

export interface ImageProps {
  imageLink: string | undefined;
  alt: string;
  title: string;
  size: number;
}

const SquareImage = ({ imageLink, alt, size, title }: ImageProps) => {
  if (!isPropReady(imageLink)) {
    return <div
      className='skeleton'
      style={{ width: size, height: size }}
    ></div>
  }

  return (
    <img
      src={imageLink}
      alt={alt}
      width={size}
      height={size}
      title={title}
    ></img>
  );
};

export default SquareImage;
