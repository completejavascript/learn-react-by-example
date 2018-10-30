import React from 'react';
import './App.css';
import Tooltip from './components/tooltip/tooltip';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Tooltip Text</h2>

        <div style={{margin: `1rem auto`}}>
          <Tooltip 
            text={"Hover over me"} 
            tooltipText={"Tooltip text"} 
            position={`top`} 
          />
          <br/><br/>
          
          <Tooltip 
            text={"Hover over me"} 
            tooltipText={"Tooltip text"} 
            position={`right`} 
            borderBottomStyle={`1px dotted #fc5d76`} 
            tooltipWidth={`120px`}
            tooltipBackgroundColor={`#fc5d76`}
          />
          <br/><br/>

          <Tooltip 
            text={"Hover over me"} 
            tooltipText={"Tooltip text Tooltip text Tooltip text Tooltip text Tooltip text"} 
            position={`bottom`} 
            borderBottomStyle={`1px dotted #3da4ab`} 
            tooltipWidth={`220px`}
            tooltipBackgroundColor={`#3da4ab`}
          />
          <br/><br/>

          <Tooltip 
            text={"Hover over me"} 
            tooltipText={"Tooltip text Tooltip text Tooltip text Tooltip text Tooltip text"} 
            position={`left`} 
            borderBottomStyle={`1px dotted #f6cd61`} 
            tooltipWidth={`220px`}
            tooltipBackgroundColor={`#f6cd61`}
            tooltipColor={`#222`}
          />
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
