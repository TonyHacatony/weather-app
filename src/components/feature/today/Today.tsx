import React from 'react';

import { TodayInfo } from '../../api/WeatherDto';
import { TemperatureText } from '../../ui/CustomText';
import { WeatherIcon } from '../../ui/SquareImage';
import { isPropReady } from '../Common';
import Forecast from './Forecast';
import { SkeletonColumn } from '../../ui/Skeleton';

interface TodayProps {
  today: TodayInfo | undefined;
}

const Today = ({ today }: TodayProps) => {
  return (
    <div className='today card-layout'>
      {isPropReady(today) ? createCard(today) : createSkeleton()}
    </div>
  );
};

const createCard = ({
  temp_c, weather_condition_code: weatherConditionCode, hours,
  wind_kph, wind_degree, wind_dir, gust_kph, humidity, vis_km,
  uv, feelslike_c, cloud, precip_mm, pressure_mb, is_day, last_updated
}: TodayInfo) =>
  <div className='today-content'>
    <div className='today-info'>
      <div className='head'>
        <span>Today</span>
        <WeatherIcon conditionCode={weatherConditionCode} />
        <TemperatureText temperature={temp_c} />
      </div>
      <div className='body'>
        <p className='body-column'>
          <span>Last updated: {last_updated.split(' ')[1]}</span>
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
          <span>Feels like: <TemperatureText temperature={feelslike_c} /></span>
        </p>
      </div>
    </div>
    <Forecast hours={hours} />
  </div>;

const createSkeleton = () =>
  <div className='today-content'>
    <div className='today-info'>
      <div className='head'>
        <span>Today</span>
        <WeatherIcon />
        <TemperatureText isHeader/>
      </div>
      <div className='body'>
        <p className='body-column'>
          <SkeletonColumn rowsCount={6} />
        </p>
        <p className='body-column'>
          <SkeletonColumn rowsCount={7} />
        </p>
      </div>
    </div>
    <Forecast />
  </div>;

export default Today;
