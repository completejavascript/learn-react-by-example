import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import createHashHistory from 'history/createHashHistory';

import SlideshowApp from './App.slideshow';
import SlideshowGalleryApp from './App.slideshow-gallery';
import ModalImageApp from './App.modal-image';
import LightBoxApp from './App.lightbox';

export default class App extends React.Component {
  render() {
    return (
      <Router className="App" basename={process.env.PUBLIC_URL}>
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
