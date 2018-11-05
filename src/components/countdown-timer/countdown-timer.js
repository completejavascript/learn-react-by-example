import React from 'react';
import ReactDOM from 'react-dom';
import './countdown-timer.css';

export default class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    
    // Xác định thời điểm cần đếm tới đó
    this.countDownDate = new Date(this.props.timeDate).getTime();

    this.updateTimer = this.updateTimer.bind(this);
  }

  updateTimer() {
    // Lấy thời gian hiện tại
    const now = new Date().getTime();

    // Tính khoảng cách thời gian từ thời điểm cần đếm so với hiện tại
    const distance = this.countDownDate - now;

    // Tính days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Hiển thị kết quả 
    this.contentElm.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Nếu distance < 0 => việc đếm kết thúc
    // Lúc này cần huỷ interval đã cài đặt và set text là EXPIRED
    if (distance < 0) {
      clearInterval(this.counterInterval);
      this.contentElm.innerText = "EXPIRED";
    }
  }

  /**
   * Hàm này được gọi khi Countdown timer đã render lên màn hình
   */
  componentDidMount() {
    // Lấy ra reference của đối tượng ứng với className="content" 
    // để hiển thị timer
    this.contentElm = ReactDOM.findDOMNode(this).querySelector(".content");

    // Update timer ngay lần đầu tiên
    this.updateTimer();

    // Tạo interval (vòng lặp) để update timer sau mỗi 1000 ms (1 giây)
    this.counterInterval = setInterval(
      () => this.updateTimer(), 
      1000
    );
  }

  render() {
    return (
      <div className="lp-countdown-timer">
        <span
          className="content"
          style={{
            fontSize: this.props.fontSize,
            color: this.props.color
          }}>
        </span>
      </div>
    )
  }
}