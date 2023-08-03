import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  viewCategory,
  viewSubCategory,
  viewProductCategory,
  viewProductBySubcategory,
  viewProductByKeyword,
  viewProduct,
} from "../../action/category.action";
import { logoutuser } from "../../action/resiter.action";
import { myCart, localCart } from "../../action/cart.action";

import "./header.css";
import img from "../../assets/images/i2.png";
import img1 from "../../assets/images/i3.png";

import Login from "../login/login";
import { Modal, ModalBody } from "reactstrap";
let result = [];

class Header extends React.Component {
  state = {
    modal: false,
    pname: "",
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentWillMount() {
    this.props.viewCategory();
    if (localStorage.getItem("token")) {
      this.props.myCart(this.props.registerId);
    } else {
      if (localStorage.getItem("cartItem")) {
        this.props.localCart();
      }
    }
  }
  handleClick(e) {
    this.props.viewSubCategory(e.target.id);
  }
  handleClickHome() {
    this.props.history.push("/");
  }
  btnLogout(e) {
    e.preventDefault();
    this.props.logoutuser();
    this.props.history.push("/");
  }
  customProfile(e) {
    e.preventDefault();
    this.props.history.push("/profile");
  }
  customProductBrand(e) {
    e.preventDefault();
    this.props.viewProductBySubcategory(e.target.id);
    this.props.history.push(`/${e.target.id}`);
  }
  handleSearch(e) {
    e.preventDefault();
    this.props.viewProductByKeyword(this.state.pname, 1, 4);
    this.props.history.push("/home");
  }
  viewCart(e) {
    e.preventDefault();
    this.props.history.push("/cart");
  }
  handleChange(e) {
    this.setState({ pname: e.target.value });
    if (e.target.value) {
      this.props.viewProductByKeyword(e.target.value, 1, 4);
      this.props.history.push("/home");
    } else {
      this.props.viewProduct();
      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">
            <div onClick={this.handleClickHome.bind(this)}>
              <img src={img1} height="30px" alt="FlipKart" />
              <img
                src={img}
                height="40px"
                style={{ paddingLeft: "10px" }}
                alt="FlipKart"
              />
            </div>
          </Navbar.Brand>
          <div className="inner-addon left-addon form">
            <i
              className="faa fa-search"
              onClick={this.handleSearch.bind(this)}
            ></i>
            <input
              type="text"
              className="form-control"
              placeholder="Search for products"
              style={{ width: "500px" }}
              value={this.state.pname}
              onChange={this.handleChange.bind(this)}
            />
            {/*{result.length>0?*/}
            {/*result.map((d)=>{*/}
            {/*return (<p className="searchResult">{d}</p>)*/}
            {/*})*/}
            {/*:null}*/}
          </div>
          <Nav className="mr-auto" style={{ marginLeft: "250px" }}>
            {this.props.token && this.props.token !== "" ? (
              <UncontrolledDropdown>
                <DropdownToggle nav caret style={{ color: "white" }}>
                  My Account
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className="a"
                    onClick={this.customProfile.bind(this)}
                  >
                    <i
                      className="fa fa-user"
                      style={{ paddingRight: "10px" }}
                    ></i>
                    My Profile
                  </DropdownItem>
                  <DropdownItem
                    className="a"
                    onClick={this.btnLogout.bind(this)}
                  >
                    <i
                      className="fa fa-power-off"
                      style={{ paddingRight: "10px" }}
                    ></i>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <Nav.Link
                onClick={this.toggle.bind(this)}
                style={{ color: "white" }}
              >
                Login & Signup
              </Nav.Link>
            )}

            <Nav.Link
              href="http://99.79.62.126:3000/cart"
              style={{ color: "white" }}
            >
              Cart
              <i className="fa2 fa-shopping-cart">
                {this.props.cnt > 0 && localStorage.getItem("token") ? (
                  <div className="bdg1">{this.props.cnt}</div>
                ) : this.props.localCnt > 0 ? (
                  <div className="bdg1">{this.props.localCnt}</div>
                ) : null}
              </i>
            </Nav.Link>
          </Nav>
        </Navbar>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          {/*<ModalHeader toggle={this.toggle}>SignUp</ModalHeader>*/}
          <ModalBody>
            <Login toggle={this.toggle} modal={this.state.modal} />
          </ModalBody>
        </Modal>
        <Nav className="nav1">
          {this.props.category.length > 0
            ? this.props.category.map((data, key) => {
                return (
                  <UncontrolledDropdown nav inNavbar key={key}>
                    <DropdownToggle
                      nav
                      caret
                      style={{
                        color: "black",
                        fontWeight: "500",
                        padding: "10px 30px",
                      }}
                      id={data.categoryId}
                      key={data.categoryId}
                      onClick={this.handleClick.bind(this)}
                    >
                      {data.categoryName}
                    </DropdownToggle>
                    {this.props.subCategory.length > 0 ? (
                      <DropdownMenu>
                        {this.props.subCategory.map((d, key) => {
                          return (
                            <DropdownItem
                              key={key}
                              className="a"
                              id={d.subCategoryId}
                              onClick={this.customProductBrand.bind(this)}
                            >
                              {d.subCategoryName}
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    ) : null}
                  </UncontrolledDropdown>
                );
              })
            : null}
        </Nav>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.register.token,
    category: state.category.category,
    subCategory: state.category.subCategoty,
    cnt: state.cart.notificationCount,
    registerId: state.register.register_id,
    localCnt: state.cart.localCount,
    product: state.category.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      viewCategory,
      localCart,
      viewSubCategory,
      viewProduct,
      myCart,
      logoutuser,
      viewProductByKeyword,
      viewProductCategory,
      viewProductBySubcategory,
    },
    dispatch
  );
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
