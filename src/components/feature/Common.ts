import { findIconName } from "../api/WeatherConditions";
import { FullWeatherInfo } from "../api/WeatherDto";

export interface WeatherProps {
  weather: FullWeatherInfo | undefined
}

export const isPropReady = <Type>(props: Type | undefined): props is Type => Boolean(props);

export const createImgLink = (isDay: boolean, weatherConditionCode: number) => {
  const imgName = findIconName(weatherConditionCode);
  return `weather/64x64/${isDay ? 'day' : 'night'}/${imgName}.png`;
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getDayOfWeek = (date: string) => {
  const day: number = new Date(date).getDay();
  if (day < 0 && day > 6) return undefined;
  return daysOfWeek[day];
}

