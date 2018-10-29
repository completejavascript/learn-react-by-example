import React from 'react';
import ReactDOM from 'react-dom';
import './tab-gallery.css';

export default class TabGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSrc: "",
      imageText: "",
    }

    const ratioWHArray = this.props.ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];

    this.updateDimensions = this.updateDimensions.bind(this);
    this.showImage = this.showImage.bind(this);
    this.hideImage = this.hideImage.bind(this);
  }

  showImage(image) {
    this.setState({
      imageSrc: image.src,
      imageText: image.caption,
    });
  }

  hideImage() {
    this.setState({
      imageSrc: "",
      imageText: "",
    });

    this.containerBottomElm.style.display = "none";
    this.updateDimensions();
  }

  updateDimensions() {
    this.containerElm.style.height = `${this.containerElm.offsetWidth / this.props.input.length / this.ratioWH}px`;
    this.containerBottomElm.style.height = `${this.containerBottomElm.offsetWidth / this.ratioWH}px`;
  }

  componentDidMount() {
    this.rootElm = ReactDOM.findDOMNode(this);
    this.containerElm = this.rootElm.querySelector(".container");
    this.containerBottomElm = this.rootElm.querySelector(".container-bottom");

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentDidUpdate() {
    if (this.state.imageSrc !== "") {
      this.containerBottomElm.style.display = "block";
      this.updateDimensions();
    }
  }

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
                  style={{ width: `${1 / this.props.input.length * 100}%`, height: `100%` }}
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