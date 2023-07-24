import React from 'react'
import {Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import './cngPass.css'

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {changePassword} from '../../action/resiter.action'
import Alert from "react-s-alert";

class ChangePassword extends React.Component {
    constructor(props){
        super(props)
        this.state={
            opass:'',
            npass:'',
            cpass:'',
            errors:{}
        }
    }
    handleCng(e){
        let id=localStorage.getItem('register_id')
        e.preventDefault()
        if(this.validateForm()) {
            let data = {
                oldPassword: this.state.opass,
                newPassword: this.state.npass,
                confirmPassword: this.state.cpass
            }
            this.props.changePassword(data, id).then(()=>{
                if(!this.props.error)
                {
                    this.setState({
                        opass:'',
                        npass:'',
                        cpass:''
                    })
                    Alert.success('Password changed successfully..!!', {
                        position: 'top-right'
                    });
                }
                else
                {
                    Alert.error(this.props.error, {
                        position: 'top-right'
                    });
                }
            }).catch((err)=>{
                console.log("Error===",err)
            })
        }
    }
    validateForm(){
        let {opass,npass,cpass}=this.state
        let errors = {};
        let formIsValid = true;
        if(!opass)
        {
            formIsValid=false;
            errors["opass"]="*Please enter your old password."
        }
        if(!npass)
        {
            formIsValid=false;
            errors["npass"]="*Please enter your new password."
        }
        if (!npass.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            formIsValid = false;
            errors["npass"] = "*Please enter secure and strong password.";
        }
        if(npass)
        {
            if(!cpass)
            {
                formIsValid=false;
                errors["cpass"]="*Please enter confirm password."
            }
            else if(npass!==cpass)
            {
                formIsValid=false;
                errors["cpass"]="confirm password does not match"
            }
            else
            {
                formIsValid=true;
                errors["cpass"]=""
            }
        }
        this.setState({
            errors: errors
        });
        return formIsValid
    }
    showPass(){
        let password=document.getElementById('npass')
        let icon =  document.getElementById('eyeIcon');
        if (password.type === 'password') {
            password.type = 'text';
            icon.classList.add("fa-eye-slash");
        } else {
            password.type = 'password';
            icon.classList.remove("fa-eye-slash");
        }
    }
    render(){
        return(
            <div className="cng">
                <Form>
                    <FormGroup row>
                        <Label for="opass" sm={4}>Old Password</Label>
                        <Col sm={8}>
                            <Input type="password" id="opass" value={this.state.opass} onChange={(e)=>this.setState({opass:e.target.value})} placeholder="Old Password" />
                            {/*<div className="errorMsgs">{this.props.error?this.props.error:this.state.errors.opass}</div>*/}
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="npass" sm={4}>New Password</Label>
                        <Col sm={8}>
                            <Input type="password" id="npass" value={this.state.npass} onChange={(e)=>this.setState({npass:e.target.value})} placeholder="New Password" />
                            <i id="eyeIcon" className="fa fa-eye togle" onClick={this.showPass.bind(this)}></i>
                            <div className="errorMsgs">{this.state.errors.npass}</div>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="cpass" sm={4}>Confirm Password</Label>
                        <Col sm={8}>
                            <Input type="password"  id="cpass" value={this.state.cpass} onChange={(e)=>this.setState({cpass:e.target.value})} placeholder="Confirm Password" />
                            <div className="errorMsgs">{this.state.errors.cpass}</div>
                        </Col>
                    </FormGroup>

                    <Button color="primary" onClick={this.handleCng.bind(this)}>Change Password</Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return({
        register_id:state.register.register_id,
        error:state.register.err
    })
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({changePassword},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword)
