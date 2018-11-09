import React from 'react';
import './App.css';

import DraggableElement from './components/draggable-element/draggable-element';

// Kết hợp Modal Image trong DraggableElement
import ModalImage from './components/modal-image/modal-image';

// Kết Slideshow trong DraggableElement
import Slideshow from './components/slideshow/slideshow';

import img1 from './images/01.jpg';
import img2 from './images/02.jpg';
import img3 from './images/03.jpg';
import img4 from './images/04.jpg';
import img5 from './images/05.jpg';
import img6 from './images/06.jpg';

const collection = [
  { src: img1, caption: "Caption one" },
  { src: img2, caption: "Caption two" },
  { src: img3, caption: "Caption three" },
  { src: img4, caption: "Caption four" },
  { src: img5, caption: "Caption five" },
  { src: img6, caption: "Caption six" },
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Draggable Element</h2>
        <div>
          Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>.
          Visit me at <a href="https://completejavascript.com/">completejavascript.com</a>.
        </div>

        <DraggableElement
          title={`Click here to move`}
          width={`400`}
          height={`250`}
          top={`150`}
          left={`200`}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </DraggableElement>

        <DraggableElement
          title={`Click here to move`}
          width={`400`}
          height={`450`}
          top={`350`}
          left={`300`}
        >
          <h3>Slideshow</h3>
          <Slideshow
            input={collection}
            ratio={`3:2`}
            mode={`manual`}
          />
        </DraggableElement>

        <DraggableElement
          title={`Click here to move`}
          width={`400`}
          height={`400`}
          top={`150`}
          left={`800`}
        >
          <h3>Modal Image</h3>
          <ModalImage
            src={img6}
            alt={`This is one of beautiful girls`}
            ratio={`3:2`}
          />
        </DraggableElement>
      </div>
    );
  }
}
