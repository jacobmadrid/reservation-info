import React from 'react';
import './App.css';
import data from './data.json';
import ReservationInfo from './ReservationInfo.js';

function App() {
  return (
    <ReservationInfo data={data}/>
  );
}

export default App;
