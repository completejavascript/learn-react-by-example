import React from 'react';
import './App.css';

import ModalImage from './components/modal-image/modal-image';
import img8 from './images/08.jpg';
import img9 from './images/09.jpg';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Image Modal</h2>
        <p>Click the image below to show the modal.</p>

        <div 
          style={{
            display: `flex`
          }}
        >
          <ModalImage
            src={img8}
            alt={`This is one of beautiful girls`}
            ratio={`3:2`}
          />
          <ModalImage
            src={img9}
            alt={`This is also one of beautiful girls`}
            ratio={`3:2`}
          />
        </div>

        <div>
          Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>.
          Visit me at <a href="https://completejavascript.com/">completejavascript.com</a>.
        </div>
      </div>
    );
  }
}
