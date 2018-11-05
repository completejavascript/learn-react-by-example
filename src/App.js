import React from 'react';
import './App.css';

import ModalImage from './components/modal-image/modal-image';
import img6 from './images/07.jpg';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Image Modal</h2>
        <p>Click the image below to show the modal.</p>

        <ModalImage 
          src={img6}  
          alt={`This is one of beautiful girls`}
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
