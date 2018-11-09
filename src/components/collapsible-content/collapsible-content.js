import React from 'react';
import ReactDOM from 'react-dom';
import './collapsible-content.css';

export default class CollapsibleContent extends React.Component {
  constructor(props) {
    super(props);

    // State isActive để quản lý xem CollapsibleContent có đang active không.
    // Nếu Active thì content sẽ được hiển thị, ngược lại thì không.
    // Nếu người dùng không truyền thuộc tính isActive vào, 
    // thì mặc định this.state.isActive là false
    this.state = {
      isActive: this.props.isActive || false
    }

    this.toggleCollapseContent = this.toggleCollapseContent.bind(this);
    this.updateContentMaxHeight = this.updateContentMaxHeight.bind(this);
  }

  /**
   * Hàm này được gọi khi người dùng click vào khu vực button title.
   * Khi đó trạng thái của this.state.isActive sẽ bị lật ngược lại.
   * Nếu nó là true => false,
   * Nếu nó là false => true
   */
  toggleCollapseContent() {
    this.setState({
      isActive: !this.state.isActive
    });
  }

  /**
   * Cập nhật maxHeight của khu vực content,
   * Nếu this.state.isActive là true thì khu vực content có maxHeight = giá trị thực tế nó cần.
   * Nếu this.state.isActive là false thì khu vực content có maxHeight = 0 => content bị ẩn.
   */
  updateContentMaxHeight() {
    if (this.state.isActive) {
      this.panelContent.style.maxHeight = this.panelContent.scrollHeight + "px";
    } else {
      this.panelContent.style.maxHeight = null;
    }
  }

  /**
   * Hàm này được gọi sau khi Collapsible content được render lên.
   * Trong này, mình sẽ lưu lại DOM node ứng với khu vực content là this.panelContent.
   * Sau đó, cập nhật lại maxHeight cho nó, tuỳ thuộc vào giá trị this.state.isActive.
   * Đồng thời, mình đăng ký sự kiện khi resize màn hình,
   * để gọi hàm updateContentMaxHeight => cập nhật lại maxHeight cho content
   */
  componentDidMount() {
    this.root = ReactDOM.findDOMNode(this);
    this.panelContent = this.root.querySelector(".content");
    
    this.updateContentMaxHeight();
    window.addEventListener("resize", this.updateContentMaxHeight);
  }

  /**
   * Hàm này được gọi khi Collapsible Content bị xoá.
   * Khi đó, mình phải huỷ đăng ký sự kiện resize lúc trước.
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateContentMaxHeight);
  }

  /**
   * Hàm này được gọi mỗi khi this.state.isActive thay đổi.
   * Trong này, mình phải gọi hàm this.updateContentMaxHeight(),
   * để cập nhật lại maxHeight cho content, ứng với trường hợp đóng hoặc mở
   */
  componentDidUpdate() {
    this.updateContentMaxHeight();
  }

  /**
   * Giao diện cho Collapsible Content
   */
  render() {
    return (
      <div className="lp-collapsible-content">
        <div
          className={`title ${this.state.isActive ? "active" : ""}`}
          onClick={this.toggleCollapseContent}
        >
          {this.props.title}
        </div>

        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}