import React from 'react'
import { MDBDataTable } from 'mdbreact';
import { Switch , Badge } from 'antd';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Col,
    Row,
    Form,
    FormGroup,
    Label,
    Input,
    Tooltip
} from 'reactstrap';
import DatePicker from 'react-date-picker';
import Alert from "react-s-alert";
import {getProductCount,productStatus,addOffer,addProduct} from "../../action/product.action";
import {getCategory,viewSubCategory} from "../../action/category.action";
import './admin.css'

class Product extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            addModal:false,
            offer:0,
            startDate: new Date(),
            endDate:new Date(),
            tooltipOpen: false,
            pid:0,
            err:'',
            category:'',
            subcategory:'',
            cid:0,
            sid:0,
            pname:'',
            brand:'',
            price:0,
            desc:'',
            pimage:[]
        };
        this.toggle = this.toggle.bind(this);
    }
    getId(e){
        this.setState({pid:e.target.id})
        this.toggle()
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    addToggle(){
        this.props.getCategory()
        this.setState(pstate=>({
            addModal:!pstate.addModal
        }))
    }
    componentWillMount() {
        this.props.getProductCount()
    }
    onChange(checked,e) {
        let id=e.target.id
        let data
        if(checked)
        {
            data={
                status:1
            }
        }
        else
        {
            data={
                status:0
            }
        }
        this.props.productStatus(data,id).then((doc)=>{
            Alert.success(data.status===1?'Product enabled successfully!!!':'Product disabled successfully!!!', {
                position: 'top-right'
            });
        })
    }
    removeOffer(e){
        let data={
            offer:0,
            startDate:null,
            endDate:null
        }
        this.props.addOffer(data,e.target.id).then(()=>{
            Alert.success('Offer removed successfully!!!', {
                position: 'top-right'
            });
        }).catch((err)=>{
            console.log("error==",err)
        })
    }
    handleOffer(){
        let {startDate,endDate}=this.state

        let today=new Date()
        let tdate = today.getDate();
        let tmonth = today.getMonth();
        let tyear = today.getFullYear();
        let todayDate = [tyear, tmonth, tdate];

        let sdate = startDate.getDate();
        let smonth = startDate.getMonth();
        let syear = startDate.getFullYear();
        let stDate = [syear, smonth, sdate];
        if(stDate>=todayDate && endDate>startDate)
        {
              let data={
                  offer:this.state.offer,
                  startDate:this.state.startDate,
                  endDate:this.state.endDate
              }
            this.props.addOffer(data,this.state.pid).then(()=>{
                this.setState({
                    offer:0,
                    startDate: new Date(),
                    endDate:new Date(),
                    pid:0,
                    err:''
                })
                Alert.success('Offer added successfully!!!', {
                    position: ' top-right'
                });
            }).catch((err)=>{
                console.log("error==",err)
            })
            this.toggle()
        }
        else
        {
            this.setState({
                err: 'please select valid start date and end date'
            });
        }
    }
    handleStartDate(date){
        this.setState({
            startDate: date
        });
    }
    handleEndDate(date){
        this.setState({
            endDate: date
        });
    }
    toggleTool() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }
    handleCategory(e){
        let cid=this.props.category.filter(c=>{
            return c.categoryName===e.target.value
        }).map(d=> d.categoryId)
        this.setState({category:e.target.value,cid:parseInt(cid)})
        this.props.viewSubCategory(parseInt(cid))
    }
    handlesubCategory(e){
        let sid=this.props.sc.filter(s=>{
            return s.subCategoryName===e.target.value
        }).map(d=>d.subCategoryId)
        this.setState({subcategory:e.target.value,sid:parseInt(sid)})
    }
    setImage(e){
        let img=[]
        for(var i=0;i<e.target.files.length;i++){
            img.push(e.target.files.item(i))
        }
        this.setState({pimage:img})
    }
    handleProduct(){
        let {pimage,pname,brand,price,desc,cid,sid}=this.state
        let data=new FormData()
        for (var i=0;i<pimage.length;i++){
            data.append('uploadfile',pimage[i])
        }

        data.append('productName',pname)
        data.append('productBrand',brand)
        data.append('productPrice',price)
        data.append('productDescription',desc)

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        this.props.addProduct(data,cid,sid,config).then(()=>{
            Alert.success('Product added successfully',{
                position:'top-right'
            })
            this.addToggle()
        }).catch(err=>{
            console.log("error=",err)
        })
    }

    render(){
        let result=[]
        this.props.data.map((d)=>{
            result.push({
                product:d.productName,
                brand:d.productBrand,
                price:d.productPrice,
                quantity:d.quantity,
                delete:<Switch id={d.productId} checked={d.status===1?'true':null} onChange={this.onChange.bind(this)} />,
                offer:(d.offer>0)?(<div><Badge count={d.offer+" %"} style={{ backgroundColor: '#52c41a' }} /><a href='#' id={d.productId} onClick={this.removeOffer.bind(this)} style={{paddingLeft:'5px'}}>Remove</a></div>):(<a href='#' id={d.productId} onClick={this.getId.bind(this)}>Add</a>)
            })
        })
        const data={
            columns:
                [
                    {
                        label: 'ProductName',
                        field: 'product',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Brand',
                        field: 'brand',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Price',
                        field: 'price',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'Quantity',
                        field: 'quantity',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: '',
                        field: 'delete',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Offer',
                        field: 'offer',
                        sort: 'asc',
                        width: 100
                    }
                ],
            rows:result
        }
        const iconStyle={
            float:'right',
            marginTop:'20px',
            marginRight:'20px',
            fontSize: '40px',
            color: 'white',
            backgroundColor:'#027BFB',
            padding:'7px 10px'
        }
        return(
            <div>
                <i className="fa fa-plus" aria-hidden="true" style={iconStyle} onClick={this.addToggle.bind(this)} id="TooltipExample"></i>
                <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggleTool.bind(this)}>
                    Add Product
                </Tooltip>

                <MDBDataTable
                    striped
                    bordered
                    hover
                    data={data}
                />
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit Category</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row form>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="exampleEmail">Add discount</Label>
                                        <Input type="number" min={0} max={100} id='exampleEmail' value={this.state.offer} onChange={(e)=>{this.setState({offer:e.target.value})}}/>
                                    </FormGroup>
                                </Col>
                                <Col md={2} style={{marginTop:'35px'}}>
                                    <span><i className="fa fa-percent fa-1x" aria-hidden="true"></i></span>
                                </Col>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Label for="exampleState" style={{marginLeft:'15px'}}> Duration:</Label>
                                </FormGroup>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <DatePicker
                                        onChange={this.handleStartDate.bind(this)}
                                        value={this.state.startDate}
                                    />
                                </Col>
                                <Col md={4}>
                                    <DatePicker
                                        onChange={this.handleEndDate.bind(this)}
                                        value={this.state.endDate}
                                    />
                                </Col>
                                <div className="errorMsg1">{this.state.err}</div>
                            </Row>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleOffer.bind(this)}>Add Offer</Button>{' '}
                        <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.addModal} toggle={this.addToggle.bind(this)} className={this.props.className}>
                    <ModalHeader toggle={this.addToggle.bind(this)}>Add Product</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleAddress">Product Name</Label>
                                <Input type="text" name="address" id="exampleAddress" placeholder="Product Name" value={this.state.pname} onChange={(e)=>{this.setState({pname:e.target.value})}}/>
                            </FormGroup>
                            <FormGroup>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail">Category</Label>
                                            <Input type="select" name="select" value={this.state.category} id="exampleSelect" onChange={this.handleCategory.bind(this)}>
                                                <option>---select---</option>
                                                {this.props.category ?
                                                    this.props.category.map(c=>
                                                    (
                                                    <option>{c.categoryName}</option>
                                                    ))
                                                :null}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="examplePassword">SubCategory</Label>
                                            <Input type="select" name="select" value={this.state.subcategory} id="exampleSelect" onChange={this.handlesubCategory.bind(this)}>
                                                <option>---select---</option>
                                                {this.props.sc ?
                                                    this.props.sc.map(cd=>
                                                    {
                                                        return (<option>{cd.subCategoryName}</option>)
                                                    })
                                                :null}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail">Brand</Label>
                                            <Input type="text" id="exampleEmail" placeholder="Product brand" value={this.state.brand} onChange={(e)=>{this.setState({brand:e.target.value})}}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="examplePassword">Price</Label>
                                            <Input type="text" id="examplePassword" placeholder="Product price" value={this.state.price} onChange={(e)=>{this.setState({price:e.target.value})}} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Description</Label>
                                <Input type="textarea" id="exampleText" placeholder="Enter product decription" value={this.state.desc} onChange={(e)=>{this.setState({desc:e.target.value})}}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">Product Image</Label>
                                <Input type="file" id="exampleFile" onChange={this.setImage.bind(this)} multiple />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleProduct.bind(this)}>Add Product</Button>{' '}
                        <Button color="secondary" onClick={this.addToggle.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return({
        data:state.admin.product,
        category:state.admin.data,
        sc:state.admin.subcategory
    })
}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({getProductCount,productStatus,addOffer,getCategory,viewSubCategory,addProduct},dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Product))
