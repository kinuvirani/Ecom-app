import React from "react";
import "./cart.css";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  myCart,
  deleteItem,
  UpdateQty,
  localCart,
  tempCart,
  placeOrder,
} from "../../action/cart.action";
import Alert from "react-s-alert";
import img from "../../assets/images/empty.png";
import { Modal, ModalBody } from "reactstrap";
import Login from "../login/login";
import Order from "./order";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      cart: [],
      order: [],
      modal: false,
      modal1: false,
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  toggle1 = () => {
    this.setState({
      modal1: !this.state.modal1,
    });
  };
  componentWillMount() {
    if (this.props.registerId) {
      this.props.myCart(this.props.registerId);
    } else {
      if (localStorage.getItem("cartItem")) {
        this.props.localCart();
      }
    }
  }

  //  componentWillReceiveProps (nextProps) {
  //     if(this.props.cart!==nextProps.cart){
  //         this.setState({cart:nextProps.cart})
  //     }
  //     else{
  //         if (nextProps.registerId) {
  //              this.props.tempCart();
  //              this.props.myCart(nextProps.registerId);
  //             // window.location.reload();
  //         }
  //         // window.location.reload();
  //         window.open('/cart')
  //     }
  // }
  viewProductDetail(e) {
    let pid = e.target.id;
    let sid = e.target.name;
    this.props.history.push(`/detail/${pid}/${sid}`);
  }
  deleteProduct(e) {
    e.preventDefault();
    this.props.deleteItem(e.target.id).then(() => {
      if (this.props.msg) {
        Alert.success(this.props.msg, {
          position: "top-right",
        });
      }
      this.props.myCart(this.props.registerId);
    });
  }
  deleteProduct1(e) {
    e.preventDefault();
    let d;
    let ary = localStorage.getItem("cartItem");
    d = ary.split(",");
    d = d.filter((data) => data !== e.target.id);
    localStorage.setItem("cartItem", d);
    if (localStorage.getItem("cartItem").split(",").length !== 0)
      this.props.localCart();
  }
  addQuantity(cart) {
    if (cart.quantity < cart.Product.quantity) {
      let qty = {
        quantity: cart.quantity + 1,
      };
      let id = cart.id;
      this.props.UpdateQty(id, qty);
    } else {
      Alert.error("No more quantity available", {
        position: "top-right",
      });
    }
  }
  minusQuantity(cart) {
    let qty = {
      quantity: cart.quantity - 1,
    };
    let id = cart.id;
    this.props.UpdateQty(id, qty);
  }
  continueShop(e) {
    e.preventDefault();
    this.props.history.push("/home");
  }
  myOrder(total) {
    // let orderItem=[]
    // this.props.cart.map((d)=>{
    //     orderItem.push(d.id)
    // })
    // let data={
    //     orderItem:orderItem.toString(),
    //     total:total
    // }
    // this.props.placeOrder()
    this.toggle1();
  }
  render() {
    let total = 0;
    const { cart, registerId, token } = this.props;
    return (
      <div className="shopping-cart">
        <div className="title">My Cart</div>
        {registerId && token !== "" ? (
          <div>
            {cart && cart.length > 0 ? (
              cart.map((cart, key) => {
                let img =
                  cart &&
                  cart.Product &&
                  cart.Product.productImage &&
                  cart.Product.productImage.split(",").length > 0
                    ? cart.Product.productImage.split(",")[0]
                    : cart.Product.productImage;
                total = total + cart.quantity * cart.Product.productPrice;
                return (
                  <div className="item" key={key}>
                    <div className="buttons">
                      <i
                        className="fa fa-close delete-btn"
                        id={cart.Product.productId}
                        onClick={this.deleteProduct.bind(this)}
                        style={{
                          fontSize: "35px",
                          marginTop: "15px",
                          color: "red",
                        }}
                      ></i>
                    </div>

                    <div className="image">
                      <img
                        onClick={this.viewProductDetail.bind(this)}
                        name={cart.Product.subCategoryId}
                        id={cart.Product.productId}
                        src={"http://99.79.62.126:3030/img/thumbnails/" + img}
                        alt=""
                      />
                    </div>

                    <div className="description">
                      <p>{cart.Product.productName}</p>
                    </div>

                    <div className="quantity">
                      <i
                        className="fa fa-plus-circle plus-btn"
                        onClick={() => this.addQuantity(cart)}
                        style={{ fontSize: "25px" }}
                      ></i>
                      <input
                        id="qty"
                        type="text"
                        name="name"
                        value={cart.quantity}
                      />
                      {cart.quantity > 1 ? (
                        <i
                          className="fa fa-minus-circle minus-btn"
                          onClick={() => this.minusQuantity(cart)}
                          style={{ fontSize: "25px" }}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-minus-circle minus-btn"
                          style={{ fontSize: "25px", color: "#C8C8C8" }}
                        ></i>
                      )}
                    </div>

                    <div className="total-price">
                      ₹ {cart.Product.productPrice}
                    </div>
                    <div className="total-price">
                      ₹ {cart.quantity * cart.Product.productPrice}
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <img src={img} className="emptyCart" />
                <h6 align="center">Your Shopping Cart is empty</h6>
              </div>
            )}
          </div>
        ) : (
          <div>
            {cart && cart.length > 0 ? (
              cart.map((cart1, key) => {
                let img =
                  cart1.productImage && cart1.productImage.split(",").length > 0
                    ? cart1.productImage.split(",")[0]
                    : cart1.productImage;
                return (
                  <div className="item" key={key}>
                    <div className="buttons">
                      <i
                        className="fa fa-close delete-btn"
                        id={cart1.productId}
                        onClick={this.deleteProduct1.bind(this)}
                        style={{
                          fontSize: "35px",
                          marginTop: "15px",
                          color: "red",
                        }}
                      ></i>
                    </div>

                    <div className="image">
                      <img
                        onClick={this.viewProductDetail.bind(this)}
                        id={cart1.productId}
                        src={"http://99.79.62.126:3030/img/thumbnails/" + img}
                        alt=""
                      />
                    </div>

                    <div className="description">
                      <p>{cart1.productName}</p>
                    </div>

                    <div className="quantity">
                      <i
                        className="fa fa-plus-circle plus-btn"
                        style={{ fontSize: "25px", color: "#C8C8C8" }}
                      ></i>
                      <input id="qty" type="text" name="name" value="1" />
                      <i
                        className="fa fa-minus-circle minus-btn"
                        style={{ fontSize: "25px", color: "#C8C8C8" }}
                      ></i>
                    </div>

                    <div className="total-price">₹ {cart1.productPrice}</div>
                    <div className="total-price">
                      ₹ {1 * cart1.productPrice}
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <img src={img} className="emptyCart" />
                <h6 align="center">Your Shopping Cart is empty</h6>
              </div>
            )}
          </div>
        )}
        {this.props.cart.length > 0 ? (
          <div className="footer">
            <button
              className="cart-btn btn1"
              onClick={this.continueShop.bind(this)}
            >
              <i
                className="fa fa-angle-left"
                style={{ fontSize: "20px", fontWeight: "600" }}
              ></i>{" "}
              CONTINUE SHOPPING
            </button>
            {registerId ? (
              <button
                className="cart-btn btn2"
                onClick={() => this.myOrder(total)}
              >
                PLACE ORDER
              </button>
            ) : null}
          </div>
        ) : null}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalBody>
            <Login toggle={this.toggle} modal={this.state.modal} />
          </ModalBody>
        </Modal>
        <Order
          toggle={this.toggle1}
          total={total}
          modal={this.state.modal1}
          cart={this.props.cart}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    msg: state.cart.success,
    registerId: state.register.register_id,
    token: state.register.token,
    cnt: state.cart.notificationCount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { myCart, deleteItem, UpdateQty, localCart, tempCart, placeOrder },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
