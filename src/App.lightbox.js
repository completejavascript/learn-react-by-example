import React from 'react';
import './App.css';

import LightBox from './components/lightbox/lightbox';
import img8 from './images/08.jpg';
import img9 from './images/09.jpg';
import img10 from './images/10.jpg';

const collection = [
  { src: img8, caption: "Caption eight" },
  { src: img9, caption: "Caption nine" },
  { src: img10, caption: "Caption ten" },
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>LightBox</h2>
        <p>Click on each image below to show the Slideshow Gallery.</p>

        <LightBox 
          input={collection}  
          ratio={`3:2`}
        />

        <div>
          Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>. 
          Visit me at <a href="https://completejavascript.com/">completejavascript.com</a>.
        </div>
      </div>
    );
  }
}
