import React from "react";
import { Carousel } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Badge } from "antd";

import { recentProduct } from "../../action/product.action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import img from "../../assets/images/ss1.jpg";
import img1 from "../../assets/images/ss2.jpg";
import img2 from "../../assets/images/ss3.jpg";

class Home extends React.Component {
  componentWillMount() {
    this.props.recentProduct();
  }
  viewProductDetail(e) {
    let pid = e.target.id;
    let sid = e.target.name;
    this.props.history.push(`/detail/${pid}/${sid}`);
  }
  viewAll(e) {
    this.props.history.push("/home");
  }
  render() {
    return (
      <div>
        <div className="row">
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={img} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={img1} alt="Third slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={img2} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
        </div>
        <div
          className="row"
          style={{
            marginTop: "5px",
            backgroundColor: "#ebe2e2a8",
            padding: "10px 0px",
          }}
        >
          <h4 style={{ marginLeft: "20px", textAlign: "center" }}>
            Recently Added
          </h4>
        </div>
        <div className="row">
          {this.props.product.length >= 1
            ? this.props.product.map((v, key) => {
                let img =
                  v.productImage && v.productImage.split(",").length > 0
                    ? v.productImage.split(",")[0]
                    : v.productImage;
                return (
                  <div key={key} className="col-xs-18 col-sm-6 col-md-2 box1">
                    <div className="thumbnail" style={{ textAlign: "center" }}>
                      <img
                        id={v.productId}
                        name={v.subCategoryId}
                        onClick={this.viewProductDetail.bind(this)}
                        src={"http://99.79.62.126:3030/img/thumbnails/" + img}
                        alt=""
                        title={v.productName}
                      />
                      <div className="caption">
                        <h6 style={{ padding: "4px" }}>{v.productName}</h6>
                        <p>
                          ₹ {v.productPrice}
                          {v.offer > 0 ? (
                            <Badge
                              count={v.offer + " %"}
                              style={{
                                backgroundColor: "#388e3c",
                                margin: "0px 10px",
                              }}
                            />
                          ) : null}
                        </p>
                        <a
                          id={v.productId}
                          name={v.subCategoryId}
                          onClick={this.viewProductDetail.bind(this)}
                          style={{ cursor: "pointer", color: "#007BFF" }}
                        >
                          More Details..
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="row">
          <a
            onClick={this.viewAll.bind(this)}
            style={{ margin: "0px 45%", color: "#007bff", cursor: "pointer" }}
          >
            View all products
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.detail.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ recentProduct }, dispatch);
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
