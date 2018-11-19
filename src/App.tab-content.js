import React from 'react';
import './App.css';
import TabContent from './components/tab-content/tab-content';

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
    const contents = [
      {
        title: "Section1",
        content:
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
      },
      {
        title: "Section2",
        content:
          <div>
            <h2> Slideshow </h2>
            <Slideshow
              input={collection}
              ratio={`3:2`}
              mode={`manual`}
            />
          </div>
      },
      {
        title: "Section3",
        content:
          <div>
            <h2>Image Modal</h2>
            <p>Click the image below to show the modal.</p>
            <ModalImage
              src={img2}
              alt={`This is one of beautiful girls`}
              ratio={`3:2`}
            />
          </div>
      },
      {
        title: "Section 4",
        content:
          <div>
            <h2>LightBox</h2>
            <p>Click on each image below to show the modal.</p>

            <LightBox
              input={collection}
              ratio={`3:2`}
            />
          </div>
      }
    ]
    return (
      <div className="App">
        <h2>Tab Content</h2>
        <p>Click on each section to change the tab content</p>

        <TabContent input={contents} />

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
