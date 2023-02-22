import { ForecastDay, ForecastGetResponse, Hour } from "./ApiTypes";
import { CommonWeatherDayInfo, HourInfo, LocationInfo, TodayInfo } from "./WeatherDto";

// all parsers for www.weatherapi.com to internal DTOs

const hourInterval = 3;
export const countOfHoursInArray = 6;

const parseTodayInfo = (response: ForecastGetResponse): LocationInfo & TodayInfo => {
  const { name, localtime, country } = response.location;
  const current = response.current;
  const forecast = response.forecast;
  const { code } = current.condition;
  const [date] = localtime.split(' ');
  const hours = [...forecast.forecastday[0].hour, ...forecast.forecastday[1].hour]
  return {
    city: name, date, country,
    ...current, is_day: parseIsDay(current.is_day),
    weather_condition_code: code,
    hours: parseHours(hours, new Date(localtime))
  };
};

const parseForecastDaysInfo = (forecasts: Array<any>): Array<CommonWeatherDayInfo> => forecasts.map(parseForecastDayInfo);
const parseForecastDayInfo = (forecast: ForecastDay): CommonWeatherDayInfo => {
  const { condition } = forecast.day;
  const date = forecast.date;
  const code = condition.code;
  return {
    ...forecast.day,
    ...forecast.astro,
    date,
    weather_condition_code: code,
  };
};

const parseHours = (hours: Array<Hour>, date: Date): Array<HourInfo> => {
  const obj = { count: 0 };
  return hours
    .filter((hour) => filterHour(hour, date, obj))
    .map(parseHour);
};

const filterHour = (hour: Hour, currentTime: Date, countObj: any) => {
  if (countObj.count >= countOfHoursInArray) return false;

  const hourTime = new Date(hour.time);
  return hourTime > currentTime
    && (((hourTime.getHours() - currentTime.getHours()) % hourInterval) === 0)
    && (countObj.count += 1);
}

const parseHour = (hour: Hour): HourInfo => ({
  ...hour,
  time: hour.time,
  weather_condition_code: hour.condition.code,
  is_day: parseIsDay(hour.is_day),
});

const parseIsDay = (is_day: number): boolean => is_day === 1 ? true : false;

export {
  parseTodayInfo, parseForecastDaysInfo,
};
