import React from 'react';
import { isPropReady } from '../feature/Common';
import { SkeletonHeaderText, SkeletonText } from './Skeleton';

interface TemperatureTextProps {
  temperature?: number,
  isHeader?: boolean,
}

export const TemperatureText = ({ temperature, isHeader }: TemperatureTextProps) => {
  if (!isPropReady(temperature)) {
    return isHeader ? <SkeletonHeaderText/> : <SkeletonText/>
  }

  const value: string = `${createSign(temperature)}${temperature} ℃`;
  return (<BaseText value={value} />);
};

const createSign = (number: number) => number > 0 ? '+' : '';

interface BaseTextProps {
  description?: string;
  value: string;
}

export const BaseText = ({ value, description }: BaseTextProps) => <span>{description}{value}</span>;
