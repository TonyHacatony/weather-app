export type FullWeatherInfo = TodayInfo & LocationInfo & DaysInfo;

export interface TodayInfo {
  date: string;
  last_updated: string;
  is_day: boolean;
  temp_c: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  vis_km: number;
  uv: number;
  gust_kph: number;
  weather_condition_code: number;
  hours: Array<HourInfo>;
}

export interface HourInfo {
  time: string;
  weather_condition_code: number;
  is_day: boolean;
  temp_c: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  precip_mm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  windchill_c: number;
  heatindex_c: number;
  dewpoint_c: number;
  chance_of_rain: number;
  chance_of_snow: number;
  vis_km: number;
  gust_kph: number;
  uv: number;
}


export interface LocationInfo {
  city: string;
  country: string;
}

export interface DaysInfo {
  nextDays: Array<CommonWeatherDayInfo>;
}

export interface CommonWeatherDayInfo {
  date: string;
  weather_condition_code: number;
  avgtemp_c: number;
  maxtemp_c: number;
  mintemp_c: number;
  maxwind_kph: number;
  avghumidity: number;
  avgvis_km: number;
  uv: number;
  sunrise: string;
  sunset: string;
  daily_chance_of_snow: number;
  daily_chance_of_rain: number;
}
