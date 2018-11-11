import React from 'react';
import ReactDOM from 'react-dom';
import './lightbox.css';
import SlideshowGallery from '../slideshow-gallery/slideshow-gallery';

export default class LightBox extends React.Component {
  constructor(props) {
    super(props);

    // Tạo reference ứng với Slideshow Gallery
    this.slideshowGallery = React.createRef();

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
   * Hiển thị Slideshow Gallery như Modal 
   * bằng cách set giá trị cho thuộc tính visibility của style, 
   * của phần tử đóng vai trò là Modal là "visible" để hiển thị nó
   * 
   * Ngoài ra, khi hiển thị Slidshow Gallery lên, 
   * mình phải gọi phương thức setSlideIndex() 
   * để xác định ảnh nào đang được active
  */
  showModal(index) {
    this.slideshowGallery.current.setSlideIndex(index);
    this.modalElm.style.visibility = "visible";
  }

  /** 
   * Ẩn phần tử Slideshow Gallery đi bằng cách set giá trị
   * cho thuộc tính visibility của style,
   * của phần tử đóng vai trò là Modal Image là "hidden",
   * để ẩn nó đi
  */
  hideModal() {
    this.modalElm.style.visibility = "hidden";
  }

  /*
  * Cập nhật chiều cao cho mỗi ảnh khi thay đổi kích thước màn hình
  * Trong phần CSS, mình để mỗi ảnh có width = 100%,
  * Nên dù kéo to hay thu nhỏ thì width vẫn bằng 100% kích thước parent.
  * Nhưng chiều cao là giá trị tuyệt đối nên phải tính lại, 
  * dựa vào width và tỉ lệ this.ratioWH = width / height
  * 
  * Ngoài ra, số lượng ảnh ban đầu là this.props.input.length 
  * chứ không phải 1 ảnh nên mình phải chia cho this.props.input.length 
  */
  updateDimensions() {
    const height = this.containerElm.offsetWidth / this.props.input.length / this.ratioWH;
    this.containerElm.style.height = `${height}px`;
  }

  /** 
   * Hàm này được gọi khi Lightbox đã render lên HTML.
   * Trong này mình sẽ lưu lại DOM node ứng với các phần tử 
   *   + this.rootElm -> toàn bộ component
   *   + this.containerElm -> container chứa các ảnh phiên bản nhỏ, hiển thị lúc đầu
   *   + this.modalElm -> chứa thành phần là modal - slideshow gallery
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
    this.containerElm = this.rootElm.querySelector(".container");
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

  /** 
   * Chú ý: thành phần bên trong phần Modal bây giờ không chỉ
   * là một ảnh như Modal Image.
   * 
   * Mà trong đó, mình truyền vào Slideshow Gallery Component
  */
  render() {
    return (
      <div className="lp-lightbox">
        <div className="container">
          {
            this.props.input.map((image, index) => {
              return (
                <div 
                  key={index}
                  className="image-wrapper" 
                  style={{ 
                    width: `${1 / this.props.input.length * 100}%`, 
                    height: `100%` 
                  }}
                >
                  <img
                    className="image"
                    src={image.src}
                    alt={image.caption}
                    onClick={() => this.showModal(index)}
                  />
                </div>
              )
            })
          }
        </div>

        <div className="modal">
          <span className="close" onClick={this.hideModal}>&times;</span>
          <div className="modal-content">
            <SlideshowGallery 
              ref={this.slideshowGallery}
              input={this.props.input}  
              ratio={this.props.ratio}
              mode={`manual`}
            />
          </div>
        </div>
      </div>
    )
  }
}