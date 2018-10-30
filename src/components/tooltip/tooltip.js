import React from 'react';
import ReactDOM from 'react-dom';
import './tooltip.css';

export default class Tooltip extends React.Component {

  /**
   * Hàm này được gọi khi Tooltip đã render lên màn hình xong
   * trong đây mình lấy ra DOM node ứng với Tooltip - ReactDOM.findDOMNode(this)
   * rồi lấy ra style của nó - ReactDOM.findDOMNode(this).style;
   * 
   * Tiếp theo, kiểm tra các thuộc tính mà người dùng truyền vào Tooltip
   * với 4 giá trị support là:
   *   + borderBottomStyle
   *   + tooltipWidth
   *   + tooltipBackgroundColor
   *   + tooltipColor
   * 
   * Nếu tồn tại thì set chúng cho các CSS variable tương ứng
   * mà mình sử dụng trong file tooltip.css
   */
  componentDidMount() {
    const rootStyle = ReactDOM.findDOMNode(this).style;
    
    if (this.props.borderBottomStyle) 
      rootStyle.setProperty('--border-bottom-style', this.props.borderBottomStyle);

    if (this.props.tooltipWidth)
      rootStyle.setProperty('--tooltip-width', this.props.tooltipWidth);

    if (this.props.tooltipBackgroundColor)
      rootStyle.setProperty('--tooltip-background-color', this.props.tooltipBackgroundColor);

    if (this.props.tooltipColor)
      rootStyle.setProperty('--tooltip-color', this.props.tooltipColor);
  }

  /**
   * Render Tooltip
   * 
   * Trong đó, giá trị của thuộc tính this.props.position có thể là: top, right, bottom, left
   * được thêm vào className của tooltip.
   * 
   * Qua đó, mình xây dựng style 
   * ứng với tooltip-text.top, tooltip-text.right, tooltip-text.bottom, tooltip-text.left
   */
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