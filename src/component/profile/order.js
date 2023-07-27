import React from "react";
import img from "../../assets/images/avatar.png";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userOrder } from "../../action/cart.action";

class Order extends React.Component {
  componentWillMount() {
    this.props.userOrder();
  }

  render() {
    let total = 0;
    let style = {
      padding: "20px,0px",
    };
    return (
      <div className="container mb-4">
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Product</th>
                    <th scope="col" className="text-center">
                      Quantity
                    </th>
                    <th scope="col" className="text-right">
                      Price
                    </th>
                    <th scope="col">Total Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.order && this.props.order.length > 0
                    ? this.props.order.map((order) => {
                        let img =
                          order &&
                          order.Product &&
                          order.Product.productImage &&
                          order.Product.productImage.split(",").length > 0
                            ? order.Product.productImage.split(",")[0]
                            : order.Product.productImage;
                        total =
                          total + order.quantity * order.Product.productPrice;
                        return (
                          <tr>
                            <td>
                              <img
                                src={
                                  "http://99.79.62.126:3030/img/thumbnails/" +
                                  img
                                }
                              />
                            </td>
                            <td>
                              <div style={style}>
                                {order.Product.productName}
                              </div>
                            </td>
                            <td>
                              <div style={{ textAlign: "center" }}>
                                {order.quantity}
                              </div>
                            </td>
                            <td className="text-right">
                              ₹ {order.Product.productPrice}{" "}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              ₹ {order.quantity * order.Product.productPrice}
                            </td>
                            <td className="text-right"></td>
                          </tr>
                        );
                      })
                    : null}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td className="text-right">
                      <strong>₹ {total}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    order: state.cart.order,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ userOrder }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
