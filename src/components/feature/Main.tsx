import React from 'react';
import { FullWeatherInfo } from '../api/WeatherDto';
import { isPropReady } from './Common';
import Footer from './Footer';
import Header from './Header';
import Days from './days/Days';
import Today from './today/Today';

interface MainProps {
  weather?: FullWeatherInfo;
  onNewValueSelected: (value: string) => void;
}

const Main = ({ weather, onNewValueSelected }: MainProps) => {
  return (
    <div className='main'>
      <Header
        info={weather}
        onNewValueSelected={onNewValueSelected}
      />
      <main>
        <Today today={weather} />
        <Days days={isPropReady(weather) ? weather.nextDays : undefined} />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
