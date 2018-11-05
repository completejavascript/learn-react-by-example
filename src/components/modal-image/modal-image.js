import React from 'react';
import ReactDOM from 'react-dom';
import './modal-image.css';

export default class ModalImage extends React.Component {
  constructor(props) {
    super(props);
    
    /*
    * Khi sử dụng, mình sẽ truyền thuộc tính ratio, giả sử là "3:2"
    * Như vậy, tỉ lệ width/height là this.ratioWH = 3 / 2
    * Mình sẽ điều chỉnh các ảnh sao cho về cùng 1 kích thước. 
    */
    const ratioWHArray = this.props.ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];

    this.updateDimensions = this.updateDimensions.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  /** 
   * Hiển thị Modal Image bằng cách set giá trị 
   * cho thuộc tính display của style, 
   * của phần tử đóng vai trò là Modal Image là "initial",
   * để hiển thị nó
  */
  showModal() {
    this.modalElm.style.display = "initial";
  }

  /** 
   * Ẩn ảnh Modal Image bằng cách set giá trị
   * cho thuộc tính display của style,
   * của phần tử đóng vai trò là Modal Image là "none",
   * để ẩn nó đi
  */
  hideModal() {
    this.modalElm.style.display = "none";
  }

  /*
  * Cập nhật chiều cao cho mỗi ảnh khi thay đổi kích thước màn hình
  * Trong phần CSS, mình để mỗi ảnh có width = 100%,
  * Nên dù kéo to hay thu nhỏ thì width vẫn bằng 100% kích thước parent.
  * Nhưng chiều cao là giá trị tuyệt đối nên phải tính lại, 
  * dựa vào width và tỉ lệ this.ratioWH = width / height
  */
  updateDimensions() {
    this.imageElm.style.height = `${this.imageElm.offsetWidth / this.ratioWH}px`;
  }

  /** 
   * Hàm này được gọi khi Modal Image đã render lên HTML.
   * Trong này mình sẽ lưu lại DOM node ứng với các phần tử 
   *   + this.rootElm -> toàn bộ component
   *   + this.imageElm -> phiên bản ảnh nhỏ, hiển thị lúc đầu
   *   + this.modalElm -> phiên bản ảnh lớn, modal image
   * 
   * Tiếp theo, gọi hàm this.updateDimensions() để cập nhật chiều cao
   * cho ảnh nhỏ ban đầu.
   * 
   * Và cuối cùng là đăng ký sự kiên resize màn hình, với hàm xử lý 
   * là updateDimensions(). Tức là mỗi khi thay đổi kích thước màn hình
   * thì sẽ tính lại chiều cao.
  */
  componentDidMount() {
    this.rootElm = ReactDOM.findDOMNode(this);
    this.imageElm = this.rootElm.querySelector(".image");
    this.modalElm = this.rootElm.querySelector(".modal");

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  /** 
   * Hàm này được gọi khi Component bị xóa khỏi HTML.
   * Lúc này mình phải hủy bỏ sự kiện đã đăng ký lúc trước.
  */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div className="lp-modal-image">
        <img 
          className="image" 
          src={this.props.src} 
          alt={this.props.alt} 
          onClick={this.showModal}
        />
        
        <div className="modal">
          <span className="close" onClick={this.hideModal}>&times;</span>
          <img className="modal-content" src={this.props.src} alt={this.props.alt + " modal"} />
          <div className="caption">{this.props.alt}</div>
        </div>
      </div>
    )
  }
}