import React from 'react';
import './App.css';
import {BrowserRouter, Route } from "react-router-dom";

import SlideshowApp from './App.slideshow';
import SlideshowGalleryApp from './App.slideshow-gallery';
import ModalImageApp from './App.modal-image';
import LightBoxApp from './App.lightbox';

export default class App extends React.Component {
  render() {
    console.log("basename", process.env.PUBLIC_URL);
    
    return (
      <div>Test</div>
    );
  }
}
