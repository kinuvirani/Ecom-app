import React, { Component } from 'react';
import {connect} from "react-redux";
import { MDBContainer, MDBBtn,MDBRow ,MDBCol} from 'mdbreact';
import {withRouter} from 'react-router-dom'
import './login.css'
import {registerUser,loginUser} from '../../action/resiter.action'
import {tempCart, addProductToCart,myCart} from '../../action/cart.action'
import Alert from "react-s-alert";


class Login extends Component {
    constructor(props) {
        super(props)
        this.state={
            status:true,
            email:'',
            password:'',
            cpassword:'',
            errors:{}
        }
        this.createAccount = this.createAccount.bind(this);
    }
    createAccount(){
        let errors={}
        errors['email']=''
        errors["password"]=''
        errors["cpassword"]=''

        this.setState(prevState => ({
            status: !prevState.status,
            email:'',
            password:'',
            cpassword:'',
            errors:''
        }));
    }
    handleRegister(e){
        e.preventDefault()
        if(this.validateForm()){
            let data={
                email:this.state.email,
                password:this.state.password,
                cpassword:this.state.cpassword
            }
            this.props.registerUser(data).then(()=>{
                this.setState({
                    email:'',
                    password:'',
                    cpassword:''
                })
                this.props.toggle()
                if(this.props.user)
                {
                    Alert.success('Registration Successful!!!', {
                        position: 'top-right'
                    });
                }
                if(this.props.error)
                {
                    Alert.error(this.props.error, {
                        position: 'top-right'
                    });
                }
            }).catch((err)=>{
                console.log("err==",err)
            })
        }
    }
    validateForm(){
        let {email,password,cpassword}=this.state
        let errors = {};
        let formIsValid = true;

        if (!email) {
            formIsValid = false;
            errors["email"] = "*Please enter your email.";
        }
        if (email !== "") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
            }
        }
        if(!password)
        {
            formIsValid=false;
            errors["password"]="*Please enter your password."
        }
        if (!password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            formIsValid = false;
            errors["password"] = "*Please enter secure and strong password.";
        }
        if(password)
        {
            if(!cpassword)
            {
                formIsValid=false;
                errors["cpassword"]="*Please enter confirm password."
            }
            else if(password!==cpassword)
            {
                formIsValid=false;
                errors["cpassword"]="confirm password does not match"
            }
            else
            {
                formIsValid=true;
                errors["cpassword"]=""
            }
        }
        this.setState({
            errors: errors
        });
        return formIsValid
    }
    handleLogin(e){
        e.preventDefault()
        if(this.validateLogin()){
            let data={
                email:this.state.email,
                password:this.state.password
            }
            this.props.loginUser(data).then(()=>{
                this.setState({
                    email:'',
                    password:''
                })
                this.props.toggle()
                if(this.props.token)
                {
                    Alert.success('Login success!!!', {
                        position: 'top-right'
                    });
                    if(localStorage.getItem('cartItem')){
                      this.props.tempCart()

                      //   let array = localStorage.getItem('cartItem').split(',')
                      //   this.props.myCart(this.props.id).then(()=>{
                      //   array.map(i=>{
                      //       console.log('user idddddddddddddddd',this.props.id)
                      //           console.log(this.props.cart)
                      //           if(this.props.cart.findIndex(c=>{
                      //               console.log('cid',c.productId)
                      //               return c.productId===Number(i)})===-1){
                      //
                      //               debugger
                      //               this.props.addProductToCart(Number(i))
                      //           }
                      //       })
                      //   })
                    }
                }
                if(this.props.error)
                {
                    Alert.error(this.props.error, {
                        position: 'top-right'
                    });
                }
                if(localStorage.getItem('role')==='Admin')
                {
                    this.props.history.push('/dashboard')
                }
                else
                {
                    this.props.history.push('/home')
                }
            }).catch(()=>{

            })
        }
    }
    validateLogin(){
        let {email,password}=this.state
        let errors = {};
        let formIsValid = true;
        if (!email) {
            formIsValid = false;
            errors["email"] = "*Please enter your email.";
        }
        if(!password)
        {
            formIsValid=false;
            errors["password"]="*Please enter your password."
        }
        this.setState({
            errors: errors
        });
        return formIsValid
    }

    render() {
       return (
            <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12">
                            <form>
                                <h2>{!this.state.status?"SignUp":"SignIn"}</h2><hr/>
                                <div className="input-container">
                                    <i className="fa fa-envelope icon" style={{marginLeft:'0px'}}></i>
                                    <input className="input-field" type="text" placeholder="Enter EmailID" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}}/>
                                </div>
                                <div className="errorMsg">{this.state.errors.email}</div>
                                <div className="input-container">
                                    <i className="fa fa-key icon" style={{marginLeft:'0px'}}></i>
                                    <input className="input-field" type="password" placeholder="Enter Password" name="password" value={this.state.password}  onChange={(e)=>{this.setState({password:e.target.value})}} />
                                </div>
                                <div className="errorMsg">{this.state.errors.password}</div>
                                {!this.state.status?(
                                    <div className="input-container">
                                        <i className="fa fa-lock icon" style={{marginLeft:'0px'}}></i>
                                        <input className="input-field" type="password" placeholder="Re-enter Password" name="cpassword" value={this.state.cpassword}  onChange={(e)=>{this.setState({cpassword:e.target.value})}} />
                                    </div>
                                ):null}
                                {!this.state.status?(
                                    <div className="errorMsg">{this.state.errors.cpassword}</div>
                                ):null}

                            </form><br/>
                            <a href="#" onClick={this.createAccount}>{this.state.status?"New to Flipkart? Create an account":"Existing User? Log In"}</a>
                        </MDBCol>
                    </MDBRow>
                <br/>
                <MDBRow>
                    <MDBCol md="12">
                    {this.state.status?(
                        <MDBBtn color="primary" onClick={this.handleLogin.bind(this)} style={{height:'50px',width:'200px'}}>Login</MDBBtn>
                    ):(
                        <MDBBtn color="primary" onClick={this.handleRegister.bind(this)} style={{height:'50px',width:'200px'}}>Signup</MDBBtn>
                    )}
                    <MDBBtn color="secondary" onClick={this.props.toggle} style={{marginLeft:'20px',height:'50px',width:'200px'}}>Close</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

// const mapDispatchToProps=(dispatch)=>{
//     return bindActionCreators({registerUser},dispatch)
// }
const mapStateToProps=(state)=>{
    return({
        error:state.register.err,
        token:state.register.token,
        user:state.register.user,
        id: state.register.register_id,
        cart:state.cart.cart
    })
}


export default withRouter(connect(mapStateToProps,{registerUser,loginUser,tempCart,addProductToCart,myCart})(Login))


