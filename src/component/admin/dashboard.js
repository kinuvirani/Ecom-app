import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import './admin.css'

import { Menu, Dropdown } from 'antd';
import Panel from './panel'
import User from './manageUser'
import Product from './manageProduct'
import Category from './manageCategory'
import SubCategory from './manageSubcategory'

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

import {getUser,logoutuser} from "../../action/resiter.action";
import {getProductCount} from '../../action/product.action'
import {getCategory,getSubCategory} from '../../action/category.action'

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            product:false,
            category:false,
            subcategory:false,
            user:false,
            panel:true
        }
    }
    componentWillMount() {
        this.props.getUser()
        this.props.getProductCount()
        this.props.getCategory()
        this.props.getSubCategory()
    }
    handleUser()
    {
        this.setState({
            user:true,
            panel:false,
            category:false,
            subcategory:false,
            product:false
        })
    }
    handlePanel()
    {
        this.setState({
            user:false,
            panel:true,
            category:false,
            subcategory:false,
            product:false
        })
    }
    handleProduct()
    {
        this.setState({
            user:false,
            panel:false,
            category:false,
            subcategory:false,
            product:true
        })
    }
    handleCategory()
    {
        this.setState({
            user:false,
            panel:false,
            category:true,
            subcategory:false,
            product:false
        })
    }
    handleSubCategory(){
        this.setState({
            user:false,
            panel:false,
            category:false,
            subcategory:true,
            product:false
        })
    }
    btnLogout(e)
    {
        e.preventDefault();
        this.props.logoutuser();
        this.props.history.push('/')
    }
    render()
    {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.handleProduct.bind(this)}>Manage Product</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.handleCategory.bind(this)}>Manage Category</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.handleSubCategory.bind(this)}>Manage SubCategory</a>
                </Menu.Item>
            </Menu>
        );
        return(
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home" onClick={this.handlePanel.bind(this)}>Flipkart</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link href="#home" onClick={this.handleUser.bind(this)} style={{color:'white'}}>Manage User</Nav.Link>
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <Nav.Link href="#pricing" style={{color:'white'}}>Product</Nav.Link>
                        </Dropdown>
                        <Nav.Link href="#features" onClick={this.btnLogout.bind(this)} style={{color:'white'}}>Logout</Nav.Link>
                    </Nav>
                </Navbar>
                {this.state.panel?<Panel/>:null}
                {this.state.user?<User/>:null}
                {this.state.product?<Product/>:null}
                {this.state.category?<Category/>:null}
                {this.state.subcategory?<SubCategory/>:null}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return({
        ucount:state.admin.ucount,
        pcount:state.admin.pcount,
        ccount:state.admin.ccount,
        scount:state.admin.scount
    })
}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({getUser,getProductCount,getCategory,getSubCategory,logoutuser},dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Dashboard))
