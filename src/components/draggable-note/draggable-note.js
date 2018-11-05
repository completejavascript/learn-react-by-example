import React from 'react';
import ReactDOM from 'react-dom';
import './draggable-note.css';

/**
 * Cross-browser để xác định clientWidth cho IE8 trở về trước
 * Draggable Note chỉ cho phép di chuyển phần tử ở trong phạm vi màn hình
 */
const maxWidth = window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

/**
 * Cross-browser để xác định clientHeight cho IE8 trở về trước
 * Draggable Note chỉ cho phép di chuyển phần tử ở trong phạm vi màn hình
 */
const maxHeight = window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

/**
 * React Component cho phép di chuyển 1 phần tử trong phạm vi màn hình.
 * Hiện tại chỉ support di chuyển trên Desktop, chưa support trên điện thoại
 */
export default class DraggableNote extends React.Component {
  constructor(props) {
    super(props);

    // Bind các phương thức để xử lý drag
    this.dragMouseDown = this.dragMouseDown.bind(this);
    this.elementDrag = this.elementDrag.bind(this);
    this.closeDragElement = this.closeDragElement.bind(this);

    // Bind các phương thức để resize content
    this.resizeMouseDown = this.resizeMouseDown.bind(this);
    this.contentResize = this.contentResize.bind(this);
    this.closeResizeContent = this.closeResizeContent.bind(this);
  }

  /**
   * Hàm này được gọi khi component render xong lên màn hình
   */
  componentDidMount() {
    // Lấy ra DOM node của đối tượng root - toàn bộ component
    this.root = ReactDOM.findDOMNode(this);

    // Lấy ra DOM node của content - vùng chứa nội dung
    this.content = this.root.querySelector(".content");

    // Lấy ra DOM node của header - vùng cho phép click chuột
    // để di chuyển
    this.header = this.root.querySelector(".header");

    // Tính lại chiều cao cho vùng content,
    // chiều rộng của content luôn = 100% giá trị của root
    this.content.style.height = `${this.root.offsetHeight - this.header.offsetHeight}px`;

    // Đăng ký sự kiện khi người dùng click chuột vào header
    this.header.addEventListener("mousedown", this.dragMouseDown);

    // Đăng ký sự kiện khi người dùng resize textarea,
    // Ở đây, mình phải dùng sự kiện mouseup vì sự kiện resize không bắt được.
    this.content.addEventListener("mousedown", this.resizeMouseDown);
  }

  componentWillUnmount() {
    // Huỷ đăng ký sự kiện khi người dùng click chuột vào header
    this.header.removeEventListener("mousedown", this.dragMouseDown);

    // Huỷ Đăng ký sự kiện khi người dùng resize textarea
    this.content.removeEventListener("mousedown", this.resizeMouseDown);
  }

  /**
   * Hàm này xử lý khi người dùng click chuột vào header,
   * do đó đối số e - tương ứng với đối tượng MouseEvent 
   */
  dragMouseDown(e) {
    // Huỷ bỏ tất cả các xử lý mặc định, nếu có
    e.preventDefault();

    // Lấy ra vị trí click chuột đầu tiên,
    // Mục đích là khi người dùng di chuyển, mình sẽ tính vị trí chuột mới.
    // Sau đó, lấy giá vị trí mới trừ đi giá trị vị trí cũ,
    // sẽ tính được khoảng di chuyển của chuột 
    // => cập nhật lại toạ độ cho Component
    this.startX = e.clientX;
    this.startY = e.clientY;

    // Đăng ký sự kiện mousemove, để xử lý khi di chuyển chuột
    window.addEventListener("mousemove", this.elementDrag);

    // Đăng ký sự kiện mouseup, để xử lý khi người dùng nhả chuột.
    // Lúc này, đồng nghĩa với việc dừng di chuyển Component.
    window.addEventListener("mouseup", this.closeDragElement);
  }

  /**
   * Xử lý khi người dùng đã click chuột vào header của component
   * và đang di chuyển => đối số e - là MouseEvent
   */
  elementDrag(e) {
    // Huỷ bỏ tất cả các xử lý mặc định, nếu có
    e.preventDefault();

    // Lúc này, mình cũng tính được vị trí của chuột hiện tại,
    // chính là e.clientX và e.clientY.
    // Sau đó, lấy giá trị cũ (this.startX, this.startY) trừ đi
    // giá trị mới là tính được khoảng di chuyển. 
    const deltaX = this.startX - e.clientX;
    const deltaY = this.startY - e.clientY;

    // Tính toán vị trí top, left, right, bottom mới của component
    const newTop = this.root.offsetTop - deltaY;
    const newLeft = this.root.offsetLeft - deltaX;
    const newRight = newLeft + this.root.offsetWidth;
    const newBottom = newTop + this.root.offsetHeight;

    // Kiểm tra thử xem ứng với vị trí mới này,
    // component có nằm trong chiều rộng màn hình không, 
    // Nếu có, thì mới cập nhật vị trí mới
    if (newLeft >= 0 && newLeft <= maxWidth &&
      newRight >= 0 && newRight <= maxWidth) {

      this.startX = e.clientX;
      this.root.style.left = `${newLeft}px`;
    }

    // Kiểm tra thử xem ứng với vị trí mới này,
    // component có nằm trong chiều cao màn hình không, 
    // Nếu có, thì mới cập nhật vị trí mới
    if (newTop >= 0 && newTop <= maxHeight &&
      newBottom >= 0 && newBottom <= maxHeight) {

      this.startY = e.clientY;
      this.root.style.top = `${newTop}px`;
    }
  }

  /**
   * Hàm này xử lý khi người dùng nhả chuột - ngừng di chuyển,
   * Mình phải huỷ các sự kiện mouseup và mousemove đã đăng ký
   */
  closeDragElement() {
    window.removeEventListener("mouseup", this.closeDragElement);
    window.removeEventListener("mousemove", this.elementDrag);
  }

  /**
   * Xử lý khi người dùng click vào khu vực textarea để resize
   */
  resizeMouseDown() {
    window.addEventListener("mousemove", this.contentResize);
    window.addEventListener("mouseup", this.closeResizeContent);
  }

  /**
   * Hàm này mục đích để kiểm tra phần textarea khi resize, 
   * nhưng khi đăng ký sự kiện là mouseup.
   */
  contentResize() {
    this.header.style.width = `${this.content.offsetWidth}px`;
    this.root.style.width = `${this.content.offsetWidth}px`;
    this.root.style.height = `${this.content.offsetHeight + this.header.offsetHeight}px`;
  }

  /**
   * Khi resize kết thúc thì phải huỷ đăng ký các event lúc trước
   */
  closeResizeContent() {
    window.removeEventListener("mouseup", this.closeResizeContent);
    window.removeEventListener("mousemove", this.contentResize);
  }

  render() {
    const title = this.props.title || "Click here to move";
    const elemStyle = {
      width: this.props.width || "300px",
      height: this.props.height || "300px",
      top: this.props.top || "0px",
      left: this.props.left || "0px"
    }

    return (
      <div className="lp-draggable-note" style={elemStyle}>
        <div className="header">{title}</div>
        <textarea
          className="content"
          defaultValue={this.props.content}
        />
      </div>
    )
  }
}