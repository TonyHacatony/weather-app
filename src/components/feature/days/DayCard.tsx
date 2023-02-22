import React from 'react';

import { CommonWeatherDayInfo } from '../../api/WeatherDto';
import { TemperatureText } from '../../ui/CustomText';
import { WeatherIcon } from '../../ui/SquareImage';
import { getDayOfWeek, isPropReady } from '../Common';
import { SkeletonColumn, SkeletonHeaderText } from '../../ui/Skeleton';

interface DayCardProps {
  info?: CommonWeatherDayInfo;
  skeletonTitle?: string
}

const DayCard = ({ info, skeletonTitle }: DayCardProps) => {
  return (isPropReady(info) ?
    createCard(info) :
    createSkeleton(skeletonTitle)
  );
};

const createCard = ({
  date, avgtemp_c, weather_condition_code: weatherConditionCode,
  maxwind_kph, avghumidity, avgvis_km, uv,
  sunrise, sunset, daily_chance_of_rain, daily_chance_of_snow,
  maxtemp_c, mintemp_c
}: CommonWeatherDayInfo) =>
  <div className='day-card card-layout'>
    <div className='head'>
      <span>{getDayOfWeek(date)}</span>
      <WeatherIcon conditionCode={weatherConditionCode} />
      <TemperatureText temperature={avgtemp_c} />
    </div>
    <div className='body'>
      <p className='body-column'>
        <span>Maximum wind: {maxwind_kph} km/h</span>
        <span>Average humidity: {avghumidity} %</span>
        <span>Average visibility: {avgvis_km} km</span>
        <span>Min temp: {mintemp_c}</span>
        <span>Max temp: {maxtemp_c}</span>
      </p>
      <p className='body-column'>
        <span>UV index: {uv}</span>
        <span>Sunrise: {sunrise}</span>
        <span>Sunset: {sunset}</span>
        <span>Chance of rain: {daily_chance_of_rain} %</span>
        <span>Chance of snow: {daily_chance_of_snow} %</span>
      </p>
    </div>
    <div></div>
  </div>;

const createSkeleton = (skeletonTitle?: string) =>
  <div className='day-card card-layout'>
    <div className='head'>
      {isPropReady(skeletonTitle) ? <span>{skeletonTitle}</span> : <SkeletonHeaderText />}
      <WeatherIcon />
      <TemperatureText />
    </div>
    <div className='body'>
      <p className='body-column'>
        <SkeletonColumn rowsCount={5} />
      </p>
      <p className='body-column'>
        <SkeletonColumn rowsCount={5} />
      </p>
    </div>
  </div>;

export default DayCard;
