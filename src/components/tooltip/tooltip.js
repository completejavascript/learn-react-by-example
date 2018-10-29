import React from 'react';
import ReactDOM from 'react-dom';
import './tooltip.css';

export default class Tooltip extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="lp-tooltip">
        <div className="tooltip">
          <span>{this.props.text}</span>
          <span className={`tooltip-text ${this.props.position}`}>{this.props.tooltipText}</span>
        </div>
      </div>
    )
  }
}