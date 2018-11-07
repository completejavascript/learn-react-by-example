import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';

import SlideshowApp from './App.slideshow';
import SlideshowGalleryApp from './App.slideshow-gallery';
import ModalImageApp from './App.modal-image';
import LightBoxApp from './App.lightbox';

const history = createHistory({
  basename: process.env.PUBLIC_URL,
});

export default class App extends React.Component {
  render() {
    return (
      <Router className="App" history={history} basename={process.env.PUBLIC_URL}>
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
