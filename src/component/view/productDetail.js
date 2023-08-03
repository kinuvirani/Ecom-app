import React from "react";
import "./productdetail.css";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getProduct,
  similarProduct,
  addRate,
  getYourRating,
  getAllRating,
} from "../../action/product.action";
import {
  addProductToCart,
  checkItemInCart,
  myCart,
  localCart,
} from "../../action/cart.action";
import Alert from "react-s-alert";
import Order from "../cart/order";
import { Rate, Popover } from "antd";
import { Modal, ModalBody, Progress } from "reactstrap";
import Login from "../login/login";
import { Button } from "react-bootstrap";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

let prary = [];
if (localStorage.getItem("cartItem")) {
  let items = localStorage.getItem("cartItem");
  let dt = items.split(",");
  for (var i = 0; i < dt.length; i++) {
    prary.push(Number(dt[i]));
  }
}

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      thumbnail: "",
      icart: false,
      modal: false,
      lmodal: false,
      value: 0,
      visible: false,
    };
  }
  componentWillMount() {
    let uid = this.props.registerId;
    let pid = this.props.match.params.id;
    let sid = this.props.match.params.sid;
    this.props.getProduct(pid);
    this.props.similarProduct(sid, pid);
    this.props.checkItemInCart(uid, pid);
    this.props.getYourRating(uid, pid);
    this.props.getAllRating(pid);
  }
  handleChange = (value) => {
    this.setState({ value });
  };
  handleThumbnail(e) {
    e.preventDefault();
    this.setState({ display: false, thumbnail: e.target.id });
  }
  handleImage(e) {
    e.preventDefault();
    this.setState({ display: true });
  }
  handleCart(e) {
    e.preventDefault();
    if (this.props.registerId && this.props.token) {
      this.props
        .addProductToCart(this.props.product.productId)
        .then(() => {
          this.setState({ icart: true });
          if (this.props.cart) {
            Alert.success("Added to cart", {
              position: "top-right",
            });
          }
          this.props.myCart(this.props.registerId);
        })
        .catch((err) => {
          console.log("error==", err);
        });
    } else {
      if (localStorage.getItem("cartItem")) {
        if (!prary.includes(this.props.product.productId)) {
          prary.push(this.props.product.productId);
          localStorage.setItem("cartItem", prary);
          this.props.localCart();
        } else {
          Alert.error("Already added to cart", {
            position: "top-right",
          });
        }
      } else {
        prary.push(this.props.product.productId);
        localStorage.setItem("cartItem", prary);
        this.props.localCart();
      }
    }
  }
  goToCart(e) {
    e.preventDefault();
    this.props.history.push("/cart");
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };
  loginToggle = () => {
    this.setState({
      lmodal: !this.state.lmodal,
    });
  };
  addRating() {
    let uid = this.props.registerId;
    let pid = this.props.match.params.id;
    let data = {
      rating: this.state.value,
    };
    this.props.addRate(data, uid, pid);
    this.setState({ visible: false });
  }

  render() {
    const popContent = (
      <div>
        <Rate
          tooltips={desc}
          onChange={this.handleChange.bind(this)}
          value={this.state.value}
          style={{ padding: "10px" }}
        />
        <Button color="primary" onClick={this.addRating.bind(this)}>
          submit
        </Button>
      </div>
    );

    let p = this.props.product;
    let img =
      p.productImage && p.productImage.split(",").length > 0
        ? p.productImage.split(",")[0]
        : p.productImage;
    var image =
      p.productImage && p.productImage.split(",").length > 1
        ? p.productImage.split(",")
        : null;
    return (
      <div className="container" style={{ marginTop: "25px" }}>
        <div className="row">
          <div className="col-md-0">
            {image && image !== null
              ? image.map((d, key) => {
                return (
                  <div key={key} className="row" style={{ marginTop: "5px" }}>
                    <a href="#" className="thumbnail">
                      <img
                        className="img-thumbnail"
                        id={d}
                        onMouseOver={this.handleThumbnail.bind(this)}
                        onMouseOut={this.handleImage.bind(this)}
                        src={"http://99.79.62.126:3030/img/thumbnails/" + d}
                      />
                    </a>
                  </div>
                );
              })
              : null}
          </div>
          <div
            className="col-md-5"
            style={{ marginLeft: "10px", padding: "0px 100px" }}
          >
            <img
              className="img-max"
              src={
                this.state.display && this.state.thumbnail === ""
                  ? "http://99.79.62.126:3030/img/" + img
                  : "http://99.79.62.126:3030/img/" + this.state.thumbnail
              }
              height={"500px"}
              title=""
              alt=""
            />
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5" style={{ marginLeft: "10px" }}>
            <h5>{p.productName}</h5>
            <p>{p.productDescription}</p>
            <h2>₹ {p.productPrice}</h2>
            <p>
              <i className="fa3 fa-calendar-check-o" aria-hidden="true"></i>No
              cost EMI ₹ 1,500/month. Standard EMI also available
            </p>
            <p>
              <i className="fa3 fa-retweet" aria-hidden="true"></i>Get upto ₹
              4450 off on exchange
            </p>
            <p>
              <i className="fa3 fa-tag"></i>Special PriceExtra ₹ 1500
              discount(price inclusive of discount)
            </p>
            <p>
              <i className="fa3 fa-tag"></i>Bank Offer10% off* with Axis Bank
              Buzz Credit Card
            </p>
            {p.offer > 0 ? (
              <p>
                You will get{" "}
                <span style={{ color: "black", backgroundColor: "#33BB59" }}>
                  {p.offer}% off
                </span>{" "}
                on this product
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-0"></div>
          <div className="col-md-6">
            {this.props.count === 1 || this.state.icart ? (
              <button
                className="cart-btn"
                style={{ backgroundColor: "#ff9f00" }}
                onClick={this.goToCart.bind(this)}
              >
                <i className="fa fa-cart-plus" aria-hidden="true"></i> GO TO
                CART
              </button>
            ) : (
              <button
                className="cart-btn"
                style={{ backgroundColor: "#ff9f00" }}
                onClick={this.handleCart.bind(this)}
              >
                <i className="fa fa-cart-plus" aria-hidden="true"></i> ADD TO
                CART
              </button>
            )}
            {localStorage.getItem("register_id") ? (
              <button
                className="cart-btn"
                onClick={this.toggle.bind(this)}
                style={{ marginLeft: "10px", backgroundColor: "#fb641b" }}
              >
                <i className="fa fa-bolt" aria-hidden="true"></i> BUY NOW
              </button>
            ) : null}
          </div>
          <div className="col-md-4"></div>
          <Order
            toggle={this.toggle}
            total={p.productPrice}
            modal={this.state.modal}
          />
        </div>

        <div className="col _39LH-M">
          <div className="_1B7BXc">
            <div className="_3unCI7">Ratings</div>
            <div className="_36nEq1">
              {this.props.registerId ? (
                this.props.rate <= 0 ? (
                  <Popover
                    content={popContent}
                    title="Rate Product"
                    trigger="click"
                    visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                  >
                    <button className="_2AkmmA _2XOAEz" type="submit">
                      <span>Rate Product</span>
                    </button>
                  </Popover>
                ) : (
                  <Rate
                    value={this.props.rate}
                    disabled={true}
                    style={{ padding: "10px" }}
                  />
                )
              ) : (
                <button
                  className="_2AkmmA _2XOAEz"
                  type="submit"
                  onClick={this.loginToggle.bind(this)}
                >
                  <span>Rate Product</span>
                </button>
              )}
              <Modal
                isOpen={this.state.lmodal}
                toggle={this.loginToggle.bind(this)}
                className={this.props.className}
              >
                <ModalBody>
                  <Login
                    toggle={this.loginToggle.bind(this)}
                    modal={this.state.lmodal}
                  />
                </ModalBody>
              </Modal>
              {this.props.registerId && this.props.rate > 0 ? (
                <p>
                  Your rating for this product is{" "}
                  <strong>{this.props.rate}.0</strong>
                </p>
              ) : null}
            </div>
          </div>
          <div className="_1B7BXc" style={{ margin: "20px 20px" }}>
            <div className="col-md-8">
              <div className="row">
                <div className="col-sm-0">5 ★</div>
                <div className="col-md-8">
                  <Progress
                    value={this.props.userRate ? this.props.userRate.r5 : 0}
                  />
                </div>
              </div>
              <div className="row" style={{ marginTop: "3px" }}>
                <div className="col-sm-0">4 ★</div>
                <div className="col-md-8">
                  <Progress
                    color="success"
                    value={this.props.userRate ? this.props.userRate.r4 : 0}
                  />
                </div>
              </div>
              <div className="row" style={{ marginTop: "3px" }}>
                <div className="col-sm-0">3 ★</div>
                <div className="col-md-8">
                  <Progress
                    color="info"
                    value={this.props.userRate ? this.props.userRate.r3 : 0}
                  />
                </div>
              </div>
              <div className="row" style={{ marginTop: "3px" }}>
                <div className="col-sm-0">2 ★</div>
                <div className="col-md-8">
                  <Progress
                    color="warning"
                    value={this.props.userRate ? this.props.userRate.r2 : 0}
                  />
                </div>
              </div>
              <div className="row" style={{ marginTop: "3px" }}>
                <div className="col-sm-0">1 ★</div>
                <div className="col-md-8">
                  <Progress
                    color="danger"
                    value={this.props.userRate ? this.props.userRate.r1 : 0}
                  />
                </div>
              </div>
            </div>
            {/*<div className='row'>*/}
            {/*<div className='col-md-1 rate'>5 ★</div>*/}
            {/*<div className='col-md-6' >*/}
            {/*<div className='rating-line' style={{width:'80%',backgroundColor:'green'}}></div>*/}
            {/*</div>*/}
            {/*<div className='col-md-1 rate-user'>hjgjh</div>*/}
            {/*</div>*/}
          </div>
        </div>

        <div
          className="row"
          style={{
            marginTop: "25px",
            backgroundColor: "#ebe2e2a8",
            padding: "10px 0px",
          }}
        >
          <h4 style={{ marginLeft: "20px", textAlign: "center" }}>
            Similar Products
          </h4>
        </div>
        <div className="row">
          {this.props.sproduct.length >= 1 ? (
            this.props.sproduct.map((v, key) => {
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
                      src={"http://99.79.62.126:3030/img/thumbnails/" + img}
                      alt=""
                      title={v.productName}
                    />
                    <div className="caption">
                      <h6 style={{ padding: "4px" }}>{v.productName}</h6>
                      <p>₹ {v.productPrice}</p>
                      <a
                        id={v.productId}
                        name={v.subCategoryId}
                        style={{ cursor: "pointer", color: "#007BFF" }}
                      >
                        More Details..
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h6 style={{ padding: "20px" }}>
              No products found for this category
            </h6>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.detail.data,
    registerId: state.register.register_id,
    error: state.cart.error,
    cart: state.cart.cart,
    count: state.cart.count,
    token: state.register.token,
    cnt: state.cart.notificationCount,
    sproduct: state.detail.product,
    rate: state.detail.rate,
    userRate: state.detail.userRate,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getProduct,
      similarProduct,
      addProductToCart,
      getAllRating,
      checkItemInCart,
      myCart,
      localCart,
      addRate,
      getYourRating,
    },
    dispatch
  );
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
);
