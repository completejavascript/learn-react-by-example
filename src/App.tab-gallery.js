import React from 'react';
import './App.css';

import TabGallery from './components/tab-gallery/tab-gallery';
import img11 from './images/11.jpg';
import img12 from './images/12.jpg';
import img13 from './images/13.jpg';

const collection = [
  { src: img11, caption: "Caption eleven" },
  { src: img12, caption: "Caption twelve" },
  { src: img13, caption: "Caption thirteen" },
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Tab Gallery</h2>
        <p>Click on each image below to show the corresponding image.</p>

        <TabGallery 
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
