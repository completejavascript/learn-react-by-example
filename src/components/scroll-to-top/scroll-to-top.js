import React from 'react';
import './scroll-to-top.css';

class ScrollToTop extends React.Component {
  /**
   * Tạo reference đến Component để sử dụng sau này
   */
  rootRef = React.createRef();

  /**
   * Hàm này xử lý khi người dùng click vào ScrollToTop button.
   * Lúc này, mình sẽ thực hiện smooth-scroll lên trên top của window
   */
  handleClick = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  /**
   * Hàm này dùng để check xem có hiển thị component hay không.
   * 
   * Nếu người dùng truyền vào thuộc tính thresholdTop,
   * mình mình sẽ lấy giá trị đó làm ngưỡng để hiển thị button.
   * 
   * Mặc định, giá trị này sẽ là 100px (so với top).
   * 
   * Nếu vị trí scrollTop hiện tại lớn hơn thresholdTop thì bắt đầu
   * hiển thị ScrollToTop button, ngược lại thì ẩn nó đi.
   */
  showOrHideBackToTopButton = () => {
    const thresholdTop = this.props.thresholdTop || 100;

    if (document.body.scrollTop > thresholdTop ||
      document.documentElement.scrollTop > thresholdTop) {
      this.rootElm.style.display = 'block';
    } else {
      this.rootElm.style.display = 'none';
    }
  }

  /**
   * Hàm này dùng để quản lý khi scroll window - hàm này đã được
   * đăng ký trong componentDidMount phía dưới.
   * 
   * Tư tưởng chung của hàm này là mỗi khi người dùng scroll windows,
   * ngay sau khi dừng scroll được 100ms thì mình sẽ check vị trí scroll
   * để quyết định xem có hiển thị hay ẩn ScrollToTop button.
   */
  handleScroll = () => {
    /**
     * Kiểm tra xem nếu this.debounceTimer khác undefined, 
     * nghĩa là người dùng đang scroll window. 
     * 
     * Lúc này mình sẽ clear nó đi - hay nói cách khác là huỷ bỏ
     * hành động, không thực hiện nữa.
     */
    if (this.debounceTimer) {
      window.clearTimeout(this.debounceTimer);
    }

    /**
     * Đăng ký gọi hàm showOrHideBackToTopButton() với timeout là 100ms.
     * Trong khoảng thời gian này, nếu người dùng vẫn scroll window,
     * thì hành động tạm thời bị xoá bỏ, cho đến khi người dùng dừng scroll.
     * 
     * 100ms sau hành động this.showOrHideBackToTopButton() sẽ được thực hiện.
     */
    this.debounceTimer = window.setTimeout(() => {
      this.showOrHideBackToTopButton();
    }, 100);
  }

  /**
   * Hàm này được gọi khi component đã render lên HTML, 
   * trong đây mình sẽ lưu lại DOM node ứng với component
   * và đăng ký sự kiện khi scroll window
   */
  componentDidMount() {
    this.rootElm = this.rootRef.current;
    window.addEventListener("scroll", this.handleScroll);
  }

  /**
   * Hàm này được gọi khi component bị xoá bỏ,
   * mình phải huỷ bỏ đăng ký sự kiện scroll trước đó.
   */
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const position = this.props.position || "right";
    const elmStyle = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.color
    }

    return (
      <div
        ref={this.rootRef}
        className={`lp-scroll-to-top ${position}`}
        style={elmStyle}
        onClick={this.handleClick}
      >
        &#8593;
      </div>
    )
  }
}

export default ScrollToTop;