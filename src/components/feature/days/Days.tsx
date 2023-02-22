import React from 'react';
import { CommonWeatherDayInfo } from '../../api/WeatherDto';
import { isPropReady } from '../Common';
import DayCard from './DayCard';

interface DaysProps {
  days?: Array<CommonWeatherDayInfo>;
}

const Days = (props: DaysProps) => {
  return (
    <div className='forecast-cards'>
      {createCards(props)}
    </div>
  );
};

const createCards = ({ days }: DaysProps) => {
  return (isPropReady(days) ?
    <>
      {createCard(days[0])}
      {createCard(days[1])}
    </>
    :
    <>
      <DayCard skeletonTitle='Tomorrow'/>
      <DayCard skeletonTitle='The next day'/>
    </>
  );
}


const createCard = (info: CommonWeatherDayInfo) => {
  return isPropReady(info) ?
    <DayCard info={info} />
    :
    <DayCard />;
}

export default Days;
