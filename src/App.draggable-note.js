import React from 'react';
import './App.css';

import DraggableNode from './components/draggable-note/draggable-note';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Sticky Notes</h2>
        {/* <div>
          Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>.
          Visit me at <a href="https://completejavascript.com/">completejavascript.com</a>.
        </div> */}

        <DraggableNode
          title={`Click here to move the note`}
          width={`400px`}
          height={`250px`}
          top={`50px`}
          left={`200px`}
          content={``}
        />
      </div>
    );
  }
}
