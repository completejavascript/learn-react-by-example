import React from 'react';
import './App.css';

import Slideshow from './components/slideshow/slideshow';
import img1 from './images/01.jpg';
import img2 from './images/02.jpg';
import img3 from './images/03.jpg';

const collection = [
  { src: img1, caption: "Caption one" },
  { src: img2, caption: "Caption two" },
  { src: img3, caption: "Caption three" },
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Slideshow 
          input={collection}  
          ratio={`3:2`}
          mode={`manual`}
        />

        <Slideshow 
          input={collection}  
          ratio={`3:2`}
          mode={`automatic`}
          timeout={`3000`}
        />

        <div>
          Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>. 
          Visit me at <a href="https://completejavascript.com/">completejavascript.com</a>.</div>
      </div>
    );
  }
}
