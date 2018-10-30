import React from 'react';
import './App.css';
import CollapsibleContent from './components/collapsible-content/collapsible-content';

// Kết hợp Slideshow trong Collapsible Content
import Slideshow from './components/slideshow/slideshow';
import img1 from './images/01.jpg';
import img2 from './images/02.jpg';
import img3 from './images/03.jpg';

// Kết hợp Modal Image trong Collapsible Content
import ModalImage from './components/modal-image/modal-image';

// Kết hợp Lightbox trong Collapsible Content
import LightBox from './components/lightbox/lightbox';

const collection = [
  { src: img1, caption: "Caption one" },
  { src: img2, caption: "Caption two" },
  { src: img3, caption: "Caption three" },
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Collapsible Content</h2>
        <p>Click on each section to toggle between hiding and showing the content</p>

        <CollapsibleContent title={`Section 1`} isActive={true}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </CollapsibleContent>

        <CollapsibleContent title={`Section 2`}>
          <h2> Slideshow </h2>
          <Slideshow
            input={collection}
            ratio={`3:2`}
            mode={`manual`}
          />
        </CollapsibleContent>

        <CollapsibleContent title={`Section 3`}>
          <h2>Image Modal</h2>
          <p>Click the image below to show the modal.</p>
          <ModalImage
            src={img2}
            alt={`This is one of beautiful girls`}
            ratio={`3:2`}
          />
        </CollapsibleContent>

        <CollapsibleContent title={`Section 4`}>
          <h2>LightBox</h2>
          <p>Click on each image below to show the modal.</p>

          <LightBox
            input={collection}
            ratio={`3:2`}
          />
        </CollapsibleContent>

        <div>
          <p>
            Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>.
            Visit me at <a href="https://completejavascript.com/">completejavascript.com</a>.
          </p>
        </div>
      </div>
    );
  }
}
