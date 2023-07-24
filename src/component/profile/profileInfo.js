import React from 'react'
import {Form,Label,FormGroup,Col,Input,Button,Row} from 'reactstrap'

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {editProfile,viewProfile} from '../../action/resiter.action'
import Alert from "react-s-alert";

class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            firstname:'',
            lastname:'',
            gender:'',
            mobile:''
        }
    }
    componentWillMount() {
        this.props.viewProfile(this.props.register_id).then(()=>{
           if(this.props.user)
           {
               this.setState({
                   firstname:this.props.user.firstname,
                   lastname:this.props.user.lastname,
                   mobile:this.props.user.mobileNo
               })
           }
        })
    }

    handleProfile(){
        let data={
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            mobileNo:this.state.mobile,
            gender:this.state.gender
        }
        this.props.editProfile(data,this.props.register_id).then(()=>{
            if(this.props.user){
                Alert.success('Profile updated successfully..!!', {
                    position: 'top-right'
                });
            }
        })
    }
    render(){
        return(
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">FirstName</Label>
                                <Input type="text" id="exampleEmail" placeholder="Enter FirstName" defaultValue={this.state.firstname} onChange={(e)=>{this.setState({firstname:e.currentTarget.value})}}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">LastName</Label>
                                <Input type="text" id="examplePassword" placeholder="Enter LastName" defaultValue={this.state.lastname} onChange={(e)=>{this.setState({lastname:e.target.value})}} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="gender" value="Male" onChange={(e)=>{this.setState({gender:e.target.value})}} />{' '}
                           Male
                        </Label>
                    </FormGroup>
                    <FormGroup check style={{marginLeft:'100px',marginTop:'-26px'}}>
                        <Label check>
                            <Input type="radio" name="gender" value="Female" onChange={(e)=>{this.setState({gender:e.target.value})}} />{' '}
                           Female
                        </Label>
                    </FormGroup><br/>
                    <FormGroup>
                        <Label for="exampleAddress">Email</Label>
                        <Input type="email" readOnly value={this.props.email} id="exampleAddress" placeholder="Enter Email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleAddress2">Mobile Number</Label>
                        <Input type="text" id="exampleAddress2" placeholder="Enter Mobile Number" defaultValue={this.state.mobile} onChange={(e)=>{this.setState({mobile:e.target.value})}} />
                    </FormGroup>
                    <Button color="primary" onClick={this.handleProfile.bind(this)}>Save Profile</Button>
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
    return bindActionCreators({editProfile,viewProfile},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile)

