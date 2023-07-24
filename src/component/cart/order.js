import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Col, Row} from 'reactstrap';
import './cart.css'
import PaypalBtn from 'react-paypal-checkout';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {placeOrder,myCart, updateProductQuantity} from '../../action/cart.action'
import {viewProfile,editAddress} from '../../action/resiter.action'

import './cart.css'
import Form from "react-bootstrap/FormGroup";

let id=localStorage.getItem('register_id')

class Order extends React.Component {
    constructor(props){
        super(props)
        this.state={
            enable:true,
            pincode:'',
            city:'',
            state1:'',
            address:'',
            locality:''
        }
    }
    componentWillMount() {
        this.props.viewProfile(this.props.registerId)
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.user){
            this.setState({
                pincode:nextProps.user.pincode,
                city:nextProps.user.city,
                state1:nextProps.user.state1,
                address:nextProps.user.address,
                locality:nextProps.user.locality
            })
        }
    }
    handleAddress(){
        let data={
            pincode:this.state.pincode,
            locality:this.state.locality,
            address:this.state.address,
            city:this.state.city,
            state1:this.state.state1
        }
        this.props.editAddress(data,this.props.registerId)
        this.props.viewProfile(id)
    }
    handleState(e){
        e.preventDefault()
        this.setState({enable:!this.state.enable})
    }
    render() {
        const {user}=this.props
        const onSuccess = (payment) => {
            if(this.props.cart)
            {
                this.props.cart.map(d=>{
                    this.props.updateProductQuantity(d.Product.productId,d.quantity)
                })
            }
            console.log("The payment was succeeded!", payment);
            this.props.placeOrder()
            this.props.toggle()
        }
        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        }
        const onError = (err) => {
            console.log("Error!", err);
        }
        let env = 'sandbox';
        let currency = 'USD';
        let total = 1;
        let locale = 'en_US';

        let style = {
            'label':'pay',
            'tagline': false,
            'size':'medium',
            'shape':'pill',
            'color':'gold'
        };

        // const client = {
        //     sandbox:    'AcovCWKjB2_VAu3cLSXuJkdHrKHPxGFBF4cxMbNr4htQoYpYnUhNtVjUay30GSYxiAPzgp61jvSHan3P',
        //     production: 'YOUR-PRODUCTION-APP-ID',
        // }

        const client = {
            sandbox:    'AfTOvHagxpO3yCzDGOCDZRQ_KR0KHoXliKuYVPf7cbKp_EJVcvveLv1qKimGTe_5xb-2LaJlNxNEhLle',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.props.toggle}>Place Order</ModalHeader>
                    <ModalBody>
                        <p className="amount">Total order amount={this.props.total}</p><br />

                        {this.state.enable?(
                                <p>{this.props.user && this.props.user.address?"Delivery address="+user.address+", "+user.city+"-"+user.pincode+", "+user.state1:"You have to mention delivery address"}</p>
                        ):
                            this.props.user?(
                                    <Form>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="pincode">Pincode</Label>
                                                    <Input type="text" name="city" id="pincode" defaultValue={this.state.pincode} onChange={(e)=>{this.setState({pincode:e.target.value})}}/>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="locality">Locality</Label>
                                                    <Input type="text" name="state" id="locality" defaultValue={this.state.locality} onChange={(e)=>{this.setState({locality:e.target.value})}}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="exampleCity">City</Label>
                                                    <Input type="text" name="city" id="exampleCity" defaultValue={this.state.city} onChange={(e)=>{this.setState({city:e.target.value})}}/>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="exampleState">State</Label>
                                                    <Input type="text" name="state" id="exampleState" defaultValue={this.state.state1} onChange={(e)=>{this.setState({state1:e.target.value})}}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <Label for="exampleAddress">Address</Label>
                                            <Input type="textarea" name="text" id="exampleAddress" placeholder="Enter Address(Area and street)" defaultValue={this.state.address} onChange={(e)=>{this.setState({address:e.target.value})}} />
                                            <Button color="primary" style={{width:'120px',marginTop:'3px',marginLeft:'345px'}} onClick={this.handleAddress.bind(this)}>Save Address</Button>
                                        </FormGroup>
                                    </Form>
                               )
                            :null
                        }
                        <a onClick={this.handleState.bind(this)} style={{color:'#007bff',cursor:'pointer'}}>Edit address</a>
                    </ModalBody>
                    <ModalFooter>
                        {this.props.user && this.props.user.address?(
                            <PaypalBtn env={env}
                                       client={client}
                                       currency={currency}
                                       total={this.props.total}
                                       onError={onError}
                                       onSuccess={onSuccess}
                                       onCancel={onCancel} />
                        ):null}
                        <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        registerId: state.register.register_id,
        cnt:state.cart.notificationCount,
        user:state.register.user
    })
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({placeOrder,myCart,viewProfile,editAddress,updateProductQuantity}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
