import React from 'react';
import './App.css';
import { HashRouter as Router, Route } from "react-router-dom";

import SlideshowApp from './App.slideshow';
import SlideshowGalleryApp from './App.slideshow-gallery';
import ModalImageApp from './App.modal-image';
import LightBoxApp from './App.lightbox';

export default class App extends React.Component {
  render() {
    return (
      <Router className="App">
        <div>
          <Route exact path="/slideshow/" component={SlideshowApp} />
          <Route exact path="/slideshow-gallery/" component={SlideshowGalleryApp} />
          <Route exact path="/modal-image/" component={ModalImageApp} />
          <Route exact path="/lightbox/" component={LightBoxApp} />
        </div>
      </Router>
    );
  }
}
