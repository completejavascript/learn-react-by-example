import React from 'react';
import './App.css';

import CountdownTimer from './components/countdown-timer/countdown-timer';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Countdown Timer</h2>

        <h3>New year: Jan 1, 2019 00:00:00</h3>
        <CountdownTimer timeDate={`Jan 1, 2019 00:00:00`} fontSize={`3rem`} color={`#222`} />

        <h3>Noel: Dec 24, 2018 11:05:12</h3>
        <CountdownTimer timeDate={`Dec 24, 2018 11:05:12`} fontSize={`2.5rem`} color={`#3da4ab`} />

        <h3>Time set: Nov 15, 2018 12:34:43</h3>
        <CountdownTimer timeDate={`Nov 15, 2018 12:34:43`} fontSize={`2.2rem`} color={`#fc5d76`} />

        <h3>Time set: Oct 30, 2018 11:25:00</h3>
        <CountdownTimer timeDate={`Oct 30, 2018 11:25:00`} fontSize={`1.8rem`} color={`#f6cd61`} />

        <div>
          Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>. 
          Visit me at <a href="https://completejavascript.com/">completejavascript.com</a>.
        </div>
      </div>
    );
  }
}
