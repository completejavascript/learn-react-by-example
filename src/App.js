import React from 'react';
import './App.css';
import Tooltip from './components/tooltip/tooltip';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Tab Gallery</h2>

        <div style={{margin: `1rem auto`}}>
          <Tooltip text={"Hover over me"} tooltipText={"Tooltip text"} position={`top`} />
          <br/><br/>
          <Tooltip text={"Hover over me"} tooltipText={"Tooltip text"} position={`right`} />
          <br/><br/>
          <Tooltip text={"Hover over me"} tooltipText={"Tooltip text"} position={`bottom`} />
          <br/><br/>
          <Tooltip text={"Hover over me"} tooltipText={"Tooltip text"} position={`left`} />
          <br/><br/>
        </div>

        <div>
          Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>.
          Visit me at <a href="https://completejavascript.com/">completejavascript.com</a>.
        </div>
      </div>
    );
  }
}
