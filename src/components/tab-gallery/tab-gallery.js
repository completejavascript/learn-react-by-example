import React from 'react';
import ReactDOM from 'react-dom';
import './tab-gallery.css';

export default class TabGallery extends React.Component {
  constructor(props) {
    super(props);

    /**
     * State lưu thông tin ảnh sẽ được hiển thị trong tab content,
     * bao gồm đường dẫn ảnh và caption của ảnh
     */
    this.state = {
      imageSrc: "",
      imageText: "",
    }

    /*
    * Khi sử dụng, mình sẽ truyền thuộc tính ratio, giả sử là "3:2"
    * Như vậy, tỉ lệ width/height là this.ratioWH = 3 / 2
    * Mình sẽ điều chỉnh các ảnh sao cho về cùng 1 kích thước. 
    */
    const ratioWHArray = this.props.ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];

    this.updateDimensions = this.updateDimensions.bind(this);
    this.showImage = this.showImage.bind(this);
    this.hideImage = this.hideImage.bind(this);
  }

  /**
   * Điều khiển việc hiển thị ảnh, với đầu vào là object lưu thông tin
   * của ảnh cần hiển thị
   */
  showImage(image) {
    this.setState({
      imageSrc: image.src,
      imageText: image.caption,
    });
  }

  /**
   * Điều khiển việc ẩn ảnh đi, 
   * bằng cách cho đường dẫn ảnh về string rỗng.
   */
  hideImage() {
    this.setState({
      imageSrc: "",
      imageText: "",
    });

    /**
     * Khi set display thành none thì phần container 
     * phía dưới sẽ không chiếm diện tích,
     * nên phải cập nhật lại kích thước của component
     */
    this.containerBottomElm.style.display = "none";
    this.updateDimensions();
  }

  /**
   * Cập nhật kích thước component
   */
  updateDimensions() {
    const tabHeight = this.containerElm.offsetWidth / this.props.input.length / this.ratioWH;
    this.containerElm.style.height = `${tabHeight}px`;

    const bottomHeight = this.containerBottomElm.offsetWidth / this.ratioWH;
    this.containerBottomElm.style.height = `${bottomHeight}px`;
  }

  /**
   * Hàm này được gọi khi component đã render lên HTML xong,
   * lúc này mình cần lưu lại DOM node ứng với các phần tử cần thiết.
   * 
   * Đồng thời tính toán kích thước component và đăng ký
   * sự kiện khi resize màn hình thì sẽ tính toán lại kích thước của component.
   */
  componentDidMount() {
    this.rootElm = ReactDOM.findDOMNode(this);
    this.containerElm = this.rootElm.querySelector(".container");
    this.containerBottomElm = this.rootElm.querySelector(".container-bottom");

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  /**
   * Hàm này được gọi khi component bị xoá khỏi HTML,
   * lúc này mình cần huỷ bỏ sự kiện đã đăng ký.
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  /**
   * Hàm này được gọi khi component update,
   * tức là khi click vào mỗi ảnh, mình sẽ hiển thị ảnh phía dưới,
   * sau đó tính toán lại kích thước phù hợp.
   */
  componentDidUpdate() {
    if (this.state.imageSrc !== "") {
      this.containerBottomElm.style.display = "block";
      this.updateDimensions();
    }
  }

  /**
   * Giao diện của tab gallery sẽ gồm 2 phần chính.
   * Phần div với tên class container sẽ hiển thị ảnh theo chiều ngang.
   * 
   * Khi click vào mỗi ảnh thì phiên bản lớn hơn của ảnh sẽ hiển thị
   * phía dưới, ứng với thẻ div với class container-bottom
   */
  render() {
    return (
      <div className="lp-tab-gallery">
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
                    onClick={() => this.showImage(image)}
                  />
                </div>
              )
            })
          }
        </div>

        <div className="container-bottom">
          <img className="image" src={this.state.imageSrc} alt={this.state.imageText} />
          <span className="close-btn" onClick={() => this.hideImage()}>&times;</span>
          <div className="image-text">{this.state.imageText}</div>
        </div>
      </div>
    )
  }
}