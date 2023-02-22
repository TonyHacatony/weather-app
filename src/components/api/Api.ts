import axios, { AxiosResponse, AxiosError } from "axios";
import { ForecastGetResponse } from "./ApiTypes";

const apiKey = process.env.GATSBY_API_KEY;

type RequestObj = ByName | ByCoords;

interface ByName {
  city: string;
}

interface ByCoords {
  latitude: number;
  longitude: number;
}

const instanceOfByName = (object: any): object is ByName => {
  return 'city' in object;
}
const instanceOfByCoords = (object: any): object is ByCoords => {
  return 'latitude' in object && 'longitude' in object;
}

const toString = (reqParams: RequestObj): string => {
  console.log(reqParams);
  if (instanceOfByName(reqParams)) {
    return reqParams.city;
  }
  if (instanceOfByCoords(reqParams)) {
    return `${reqParams.latitude},${reqParams.longitude}`;
  }
  console.log(`Haven't handling for ${reqParams}`);
  return '';
}

const findWeather = (reqParams: RequestObj, days = 3) => {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${toString(reqParams)}&days=${days}&aqi=no&alerts=no`;
  return madeRequest(url);
}

const madeRequest = async (url: string): Promise<AxiosResponse<ForecastGetResponse> | any> => {
  return axios.get<ForecastGetResponse>(url)
    .catch((axios) => {
      console.log('api call error');
      return axios;
    });
}

export { 
  findWeather,
  RequestObj,
  AxiosError 
};
