import React, { useEffect, useState } from 'react';
import { notification } from 'antd';

import './style.scss';
import { AxiosError, findWeather, RequestObj } from '../components/api/Api';
import { parseForecastDaysInfo, parseTodayInfo } from '../components/api/WeatherApiDotComParser';
import { FullWeatherInfo } from '../components/api/WeatherDto';
import Main from '../components/feature/Main';

const index = () => {
  const [weather, setWeather] = useState<FullWeatherInfo | undefined>(undefined);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, description: string, notificationType: 'info' | 'error' = 'info') => {
    if (notificationType === 'info') {
      api.info({
        message,
        description,
        placement: 'topRight',
      });
    }
    if (notificationType === 'error') {
      api.error({
        message,
        description,
        placement: 'topRight',
      })
    }
  };

  useEffect(() => {
    getGeoLocation();
  }, []);

  const collectWeather = async (q: RequestObj): Promise<FullWeatherInfo | AxiosError> => {
    const data = await findWeather(q);

    if (data instanceof AxiosError) {
      setWeather(undefined);
      return Promise.reject(data);
    }
    const response = data.data;
    const weather = parseTodayInfo(response);
    const forecasts = response.forecast.forecastday;
    const nextDays = parseForecastDaysInfo([forecasts[1], forecasts[2]]);

    const fullInfo: FullWeatherInfo = { ...weather, nextDays };
    setWeather(fullInfo);
    return Promise.resolve(fullInfo);
  };

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords;
        collectWeather(coords)
          .then(() => {
            openNotification('Weather updated', 'Updated by your coordinates');
          })
          .catch(() => {
            const { latitude, longitude } = coords;
            openNotification('Update failed', `Incorrect coordinates: ${latitude},${longitude}`)
          });
      });
    } else {
      openNotification("Geolocation is not supported by this browser", '', 'error');
    }
  };

  const handleInput = async (name: string) => {
    await collectWeather({ city: name })
      .then(() => {
        openNotification('Weather updated', `Found weather for city: ${name}`);
      })
      .catch(() => {
        openNotification('Incorrect input', `Can't find city: ${name}`, 'error');
      });

  };

  return (
    <>
      {contextHolder}
      <Main weather={weather} onNewValueSelected={handleInput} />
    </>
  );
};

export default index;
