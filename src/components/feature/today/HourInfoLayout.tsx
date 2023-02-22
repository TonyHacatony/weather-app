import React from 'react';

import { HourInfo } from '../../api/WeatherDto';
import { isPropReady } from '../Common';
import { SkeletonColumn } from '../../ui/Skeleton';

interface HourInfoProps {
  hour: HourInfo | undefined,
}

const HourInfoLayout = ({ hour }: HourInfoProps) => {
  return (isPropReady(hour) ? createCard(hour) : createSkeleton());
};
const createCard = ({
  cloud, humidity, vis_km, uv, is_day, wind_kph,
  wind_degree, wind_dir, gust_kph, precip_mm, pressure_mb
}: HourInfo) => {
  return (
    <div className='body'>
      <p className='body-column'>
        <span>Cloud cover: {cloud} %</span>
        <span>Humidity: {humidity} %</span>
        <span>Visibility: {vis_km} km</span>
        <span>UV index: {uv}</span>
        <span>Day: {is_day ? 'yes' : 'no'}</span>
      </p>
      <p className='body-column'>
        <span>Wind speed: {wind_kph} km/h</span>
        <span>Wind degree: {wind_degree} °</span>
        <span>Wind direction: {wind_dir}</span>
        <span>Wind gust: {gust_kph} km/h</span>
        <span>Precipitation amount: {precip_mm} mm</span>
        <span>Pressure: {pressure_mb} mbar</span>
      </p>
    </div>
  );
};

const createSkeleton = () =>
  <div className='body'>
    <p className='body-column'>
      <SkeletonColumn rowsCount={5} />
    </p>
    <p className='body-column'>
      <SkeletonColumn rowsCount={6} />
    </p>
  </div>;

export default HourInfoLayout;
