import React from 'react';
import { Input } from 'antd';
const { Search } = Input;

import { LocationInfo } from '../api/WeatherDto';
import { isPropReady } from './Common';

interface HeaderProps {
  info?: LocationInfo;
  onNewValueSelected: (value: string) => void;
}

const Header = ({ info, onNewValueSelected }: HeaderProps) => {
  return (
    <header>
      {createTitle(info)}
      <Search placeholder="input city name" onSearch={(val) => onNewValueSelected(val)} style={{ width: 200 }} size='middle' enterButton />
    </header>
  );
};

const createTitle = (info?: LocationInfo) => {
  return (
    <span id='header-title'>
      <span>Location: </span>
      <span className='value'>
        {isPropReady(info) ? `${info.country}, ${info.city}` : 'Not selected'}
      </span>
    </span>
  );

}

export default Header;
