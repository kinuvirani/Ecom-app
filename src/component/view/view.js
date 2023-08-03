import React from "react";
import "./view.css";

import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  viewAllProductCategory,
  viewProductBySubcategory,
  viewProduct,
  viewProductByProductCategory,
  filterProduct,
} from "../../action/category.action";
import { withRouter } from "react-router-dom";
import { Badge } from "antd";

let ary = [];

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checklist: [],
      pageSize: 4,
      currrentPage: 1,
      value: { min: 0, max: 35000 },
    };
  }
  componentWillMount() {
    if (!this.props.match.params.id) {
      this.props.viewProduct();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      !nextProps.match.params.id &&
      nextProps.match.params.id !== this.props.match.params.id
    ) {
      this.props.viewProduct();
    }
  }
  viewProductDetail(e) {
    let pid = e.target.id;
    let sid = e.target.name;
    this.props.history.push(`/detail/${pid}/${sid}`);
  }
  handleChange(v) {
    this.setState({
      value: v,
    });
    this.props.filterProduct(v.min, v.max);
  }
  render() {
    return (
      <div className="container">
        <div className="row" style={{ padding: "30px" }}>
          <InputRange
            maxValue={35000}
            minValue={0}
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className="row">
          {this.props.view.length >= 1 ? (
            this.props.view.map((v, key) => {
              let img =
                v.productImage && v.productImage.split(",").length > 0
                  ? v.productImage.split(",")[0]
                  : v.productImage;
              return (
                <div key={key} className="col-xs-18 col-sm-6 col-md-3 box">
                  <div className="thumbnail" style={{ textAlign: "center" }}>
                    <img
                      id={v.productId}
                      name={v.subCategoryId}
                      onClick={this.viewProductDetail.bind(this)}
                      src={"http://99.79.62.126:3030/img/home/" + img}
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
          ) : (
            <h4 align="center">No products found for this product category</h4>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pcategory: state.category.productCategory,
    view: state.category.products,
    count: state.category.count,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      viewAllProductCategory,
      filterProduct,
      viewProductBySubcategory,
      viewProduct,
      viewProductByProductCategory,
    },
    dispatch
  );
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(View));
