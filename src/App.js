import React from 'react';
import './App.css';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';

import SlideshowApp from './App.slideshow';
import SlideshowGalleryApp from './App.slideshow-gallery';
import ModalImageApp from './App.modal-image';
import LightBoxApp from './App.lightbox';
import TabGalleryApp from './App.tab-gallery';
import TabContentApp from './App.tab-content';
import CollapsibleContentApp from './App.collapse-content';
import DraggableElementApp from './App.draggable-element';
import DraggableNoteApp from './App.draggable-note';
import StickyNotesApp from './App.sticky-notes';
import CountdownTimerApp from './App.countdown-timer';
import TooltipApp from './App.tooltip';
import ScrollToTop from './App.scroll-to-top';

const Home = () => (
  <div style={{
    width: `100%`,
    maxWidth: `640px`,
    margin: `auto`,
    padding: `15px`
  }}>
    <h2>Learn React by Example</h2>
    <ul>
      <li><Link to="/slideshow/">Example #1: Slideshow</Link></li>
      <li><Link to="/slideshow-gallery/">Example #2: Slideshow Gallery</Link></li>
      <li><Link to="/modal-image/">Example #3: Modal Image</Link></li>
      <li><Link to="/lightbox/">Example #4: Lightbox</Link></li>
      <li><Link to="/tab-gallery/">Example #5: Tab Gallery</Link></li>
      <li><Link to="/tab-content/">Example #6: Tab Content</Link></li>
      <li><Link to="/collapsible-content/">Example #7: Collapsible Content</Link></li>
      <li><Link to="/draggable-element/">Example #8: Draggable Element</Link></li>
      <li><Link to="/draggable-note/">Example #9: Draggable Note</Link></li>
      <li><Link to="/sticky-notes/">Example #10: Sticky Notes</Link></li>
      <li><Link to="/countdown-timer/">Example #11: Countdown Timer</Link></li>
      <li><Link to="/tooltip/">Example #12: Tooltip</Link></li>
      <li><Link to="/scroll-to-top/">Example #13: Scroll-To-Top</Link></li>
    </ul>
  </div>
)

export default class App extends React.Component {
  render() {
    return (
      <HashRouter className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/slideshow/" component={SlideshowApp} />
          <Route exact path="/slideshow-gallery/" component={SlideshowGalleryApp} />
          <Route exact path="/modal-image/" component={ModalImageApp} />
          <Route exact path="/lightbox/" component={LightBoxApp} />
          <Route exact path="/tab-gallery/" component={TabGalleryApp} />
          <Route exact path="/tab-content/" component={TabContentApp} />
          <Route exact path="/collapsible-content/" component={CollapsibleContentApp} />
          <Route exact path="/draggable-element/" component={DraggableElementApp} />
          <Route exact path="/draggable-note/" component={DraggableNoteApp} />
          <Route exact path="/sticky-notes/" component={StickyNotesApp} />
          <Route exact path="/countdown-timer/" component={CountdownTimerApp} />
          <Route exact path="/tooltip/" component={TooltipApp} />
          <Route exact path="/scroll-to-top/" component={ScrollToTop} />
        </Switch>
      </HashRouter>
    );
  }
}
