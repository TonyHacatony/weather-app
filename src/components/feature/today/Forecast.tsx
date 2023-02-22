import React, { useState } from 'react';

import { HourInfo } from '../../api/WeatherDto';
import { TemperatureText } from '../../ui/CustomText';
import { WeatherIcon } from '../../ui/SquareImage';
import { isPropReady } from '../Common';
import HourInfoLayout from './HourInfoLayout';
import { countOfHoursInArray } from '../../api/WeatherApiDotComParser';
import { SkeletonBtnText } from '../../ui/Skeleton';

interface HourProps {
  hours?: Array<HourInfo>
}

const Forecast = ({ hours }: HourProps) => {
  const [selectedHour, setHour] = useState<HourInfo | undefined>(undefined);

  const createHours = (hours: Array<HourInfo>) => {
    return hours.map((hour: HourInfo) => {
      const { time, weather_condition_code: code, temp_c, is_day }: HourInfo = hour;
      return (
        <div
          className={`hour-card${isShouldBeSelected(hours, hour) ? ' selected' : ''}`}
          onClick={() => setHour(hour)}
          key={time}
        >
          <div>{getOnlyTime(time)}</div>
          <WeatherIcon isDay={is_day} conditionCode={code} />
          <TemperatureText temperature={temp_c} />
        </div>
      );
    });
  }

  const isShouldBeSelected = (hours: Array<HourInfo>, hour: HourInfo) =>
    selectedHour === hour
    || (selectedHour === undefined && hours.indexOf(hour) === 0);

  const getHourForForecast = () =>
    isPropReady(hours) && selectedHour === undefined
      ? hours[0] : selectedHour;

  const getOnlyTime = (date: string) => date.split(' ')[1];

  return (
    <div className='forecast'>
      <div className="head">Forecast</div>
      <HourInfoLayout hour={getHourForForecast()} />
      <div className='hours-cards'>
        {isPropReady(hours) ? createHours(hours) : createSkeleton()}
      </div>
    </div>
  );


};

const createSkeleton = () => {
  const arr = Array.from(Array(countOfHoursInArray + 1).keys()).slice(1);
  return arr.map((i) => {
    return (
      <div className='hour-card disable-hover' key={i}>
        <SkeletonBtnText />
        <WeatherIcon />
        <SkeletonBtnText />
      </div>
    );
  });
};

export default Forecast;
