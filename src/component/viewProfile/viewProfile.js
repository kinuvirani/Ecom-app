import React from "react";
import "./viewProfile.css";
import img from "../../assets/images/avatar.png";
import Profile from "../profile/profileInfo";
import Address from "../profile/addressInfo";
import Order from "../profile/order";
import ChangePassword from "../profile/changePass";

import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { logoutuser } from "../../action/resiter.action";

class ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pstate: true,
      astate: false,
      ostate: false,
      cpstate: false,
    };
  }
  componentWillMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    }
  }
  handleProfile() {
    this.setState({
      pstate: true,
      astate: false,
      ostate: false,
      cpstate: false,
    });
  }
  handleAddress() {
    this.setState({
      astate: true,
      pstate: false,
      ostate: false,
      cpstate: false,
    });
  }
  handleOrder() {
    this.setState({
      ostate: true,
      pstate: false,
      astate: false,
      cpstate: false,
    });
  }
  handlePassword() {
    this.setState({
      cpstate: true,
      astate: false,
      pstate: false,
      ostate: false,
    });
  }
  btnLogout_click(e) {
    e.preventDefault();
    this.props.logoutuser();
    this.props.history.push("/");
  }
  goToCart(e) {
    e.preventDefault();
    this.props.history.push("/cart");
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="sidenav">
            <div>
              <img src={img} alt="Avatar" className="avatar" />
              <div className="welcome">Hello</div>
            </div>
            <div className="orderDetail">
              <div className="marg">
                <i className="fa1 fa-shopping-basket" aria-hidden="true"></i>
                <div
                  onClick={this.handleOrder.bind(this)}
                  className="mainContent"
                >
                  My ORDERS
                </div>
              </div>
              <div className="marg">
                <i className="fa1 fa-user"></i>
                <div className="mainContent">Account Settings</div>
                <a href="#" onClick={this.handleProfile.bind(this)}>
                  Profile Information
                </a>
                <a href="#address" onClick={this.handleAddress.bind(this)}>
                  Manage Address
                </a>
                <a href="#" onClick={this.handlePassword.bind(this)}>
                  Change Password
                </a>
              </div>
              <div className="marg">
                <i className="fa1 fa-address-card"></i>
                <div className="mainContent">My STUFFS</div>
                <a href="#">All Notifications</a>
                <a href="#" onClick={this.goToCart.bind(this)}>
                  My Wishlist
                </a>
              </div>
              <div className="marg">
                <i className="fa1 fa-sign-out"></i>
                <div className="mainContent">
                  <a href="#" onClick={this.btnLogout_click.bind(this)}>
                    LOGOUT
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="main">
            <h4>
              {this.state.pstate
                ? "Profile Information"
                : this.state.astate
                ? "Address Information"
                : this.state.ostate
                ? "Order Details"
                : "Change Password"}
            </h4>
            <div className="content"> </div>
            {this.state.pstate ? <Profile /> : null}
            {this.state.astate ? <Address /> : null}
            {this.state.ostate ? <Order /> : null}
            {this.state.cpstate ? <ChangePassword /> : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logoutuser }, dispatch);
};
export default withRouter(connect(null, mapDispatchToProps)(ViewProfile));
