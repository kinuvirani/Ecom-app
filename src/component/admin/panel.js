import React from 'react'
import { Card, CardDeck, CardBody } from 'reactstrap';


import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

import {getUser} from "../../action/resiter.action";
import {getProductCount} from '../../action/product.action'
import {getCategory,getSubCategory} from '../../action/category.action'

class Panel extends React.Component{
    render(){
        return(
            <div className='container' style={{marginTop:"30px"}}>
                <div className='row'>
                    <div className='col-md-12'>
                        <CardDeck>
                            <Card style={{borderColor: '#28a745'}}>
                                <CardBody>
                                    <div className='user' style={{backgroundColor: '#28a745'}}>
                                        <i className="fa fa-shopping-basket" aria-hidden="true" style={{paddingRight:'20px'}}></i>Products
                                    </div>
                                    <div className='count' style={{color: '#28a745'}}>
                                        {this.props.pcount<10?"0"+this.props.pcount:this.props.pcount}
                                    </div>
                                </CardBody>
                            </Card>
                            <Card style={{borderColor: '#dc3545'}}>
                                <CardBody>
                                    <div className='user' style={{backgroundColor: '#dc3545'}}>
                                        <i className="fa fa-cubes" aria-hidden="true" style={{paddingRight:'20px'}}></i>Category
                                    </div>
                                    <div className='count' style={{color: '#dc3545'}}>
                                        {this.props.ccount<10?"0"+this.props.ccount:this.props.ccount}
                                    </div>
                                </CardBody>
                            </Card>
                            <Card style={{borderColor: '#fd7e14'}}>
                                <CardBody>
                                    <div className='user' style={{backgroundColor: '#fd7e14'}}>
                                        <i className="fa fa-th-large" aria-hidden="true" style={{paddingRight:'20px'}}></i>Sub-Category
                                    </div>
                                    <div className='count' style={{color: '#fd7e14'}}>
                                        {this.props.scount<10?"0"+this.props.scount:this.props.scount}
                                    </div>
                                </CardBody>
                            </Card>
                        </CardDeck>
                    </div>
                    <div className='col-md-4' style={{marginTop:"30px"}}>
                        <CardDeck>
                            <Card style={{borderColor: '#007bff'}}>
                                <CardBody>
                                    <div className='user' style={{backgroundColor: '#007bff'}}>
                                        <i className="fa fa-users" aria-hidden="true" style={{paddingRight:'20px'}}></i>Users
                                    </div>
                                    <div className='count' style={{color: '#007bff'}}>
                                        {this.props.ucount<10?"0"+this.props.ucount:this.props.ucount}
                                    </div>
                                </CardBody>
                            </Card>
                        </CardDeck>
                    </div>
                </div>
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
    return bindActionCreators({getUser,getProductCount,getCategory,getSubCategory},dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Panel))
