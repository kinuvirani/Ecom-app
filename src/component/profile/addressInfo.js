import React from 'react'
import {Form,Label,FormGroup,Col,Input,Button,Row} from 'reactstrap'

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {editAddress, viewProfile} from '../../action/resiter.action'

class Address extends React.Component{
    constructor(props){
        super(props)
        this.state={
            pincode:'',
            locality:'',
            address:'',
            city:'',
            state1:''
        }
    }
    componentWillMount() {
        this.props.viewProfile(this.props.register_id).then(()=>{
            if(this.props.user)
            {
                console.log("addressinfo===",this.props.user.address)
                this.setState({
                    pincode:this.props.user.pincode,
                    locality:this.props.user.locality,
                    address:this.props.user.address,
                    city:this.props.user.city,
                    state1:this.props.user.state1
                })
            }
        })
    }

    handleAddress(){
        let data={
            pincode:this.state.pincode,
            locality:this.state.locality,
            address:this.state.address,
            city:this.state.city,
            state1:this.state.state1
        }
        console.log("Data===",data)

        this.props.editAddress(data,this.props.register_id)
    }
    render(){
        return(
            <Form>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">Pincode</Label>
                            <Input type="text"  id="exampleEmail" placeholder="Enter Pincode" defaultValue={this.state.pincode} onChange={(e)=>{this.setState({pincode:e.target.value})}} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">Locality</Label>
                            <Input type="text" id="examplePassword" placeholder="Enter Locality" defaultValue={this.state.locality} onChange={(e)=>{this.setState({locality:e.target.value})}}/>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="exampleAddress">Address</Label>
                    <Input type="textarea" name="text" id="exampleAddress" placeholder="Enter Address(Area and street)" value={this.state.address} onChange={(e)=>{this.setState({address:e.target.value})}} />
                </FormGroup>

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

                <Button color="primary" onClick={this.handleAddress.bind(this)}>Save Address Information</Button>
            </Form>
        )
    }
}

const mapStateToProps=(state)=>{
    return({
        email:state.register.email,
        user:state.register.user,
        register_id:state.register.register_id,
    })
}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({editAddress,viewProfile},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Address)
