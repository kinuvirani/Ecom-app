import React from 'react'

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import { MDBDataTable } from 'mdbreact';

import { getSubCategory , subcategoryStatus , addSubcategory, updateSubCategory ,getCategory} from "../../action/category.action";
import {Switch} from "antd";
import Alert from "react-s-alert";
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Tooltip
} from "reactstrap";

class SubCategory extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            subcategory:'',
            id:0,
            modal1:false,
            tooltipOpen: false,
            category:''
        };

        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);
    }
    componentWillMount() {
        this.props.getSubCategory()
        this.props.getCategory()
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
        this.props.subcategoryStatus(data,id).then((doc)=>{
            Alert.success(data.status===1?'Product enabled successfully!!!':'Product disabled successfully!!!', {
                position: 'top-right'
            });
        })
    }
    getData(e) {
        this.setState(prevState => ({
            subcategory:e.subCategoryName,
            id:e.subCategoryId
        }))
        this.toggle()
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    toggle1() {
        this.setState(prevState => ({
            modal1: !prevState.modal1
        }));
    }
    toggleTool() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }
    editSubCategory(e){
        let data={
            subCategoryName:this.state.subcategory
        }
        this.props.updateSubCategory(data,this.state.id)
        this.setState({subcategory:''})
        this.toggle()
    }
    handleAddSubcategory(){
        let cid=this.props.category.filter((d)=>{
              return d.categoryName===this.state.category
        }).map(id=>id.categoryId)
        let data={
            subCategoryName:this.state.subCategory
        }
        this.props.addSubcategory(data,parseInt(cid)).then(()=>{
            Alert.success('SubCategory added successfully', {
                position: 'top-right'
            });
            this.setState({
                category:'',
                subcategory:''
            })
            this.toggle1()
        })
    }
    render(){
        let result=[]
        this.props.data.map((d)=>{
            result.push({
                id:d.subCategoryId,
                category:d.category?d.category.categoryName:null,
                subCategory:d.subCategoryName,
                delete:<Switch id={d.subCategoryId} checked={d.status===1?'true':null} onChange={this.onChange.bind(this)} />,
                edit:<i className = "fa fa-pencil-square-o fa-2x" style={{color:'green'}} aria-hidden = "true" onClick={()=>this.getData(d)}></i>
            })
        })
        const data={
            columns:
                [
                    {
                        label: 'ID',
                        field: 'id',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Category Name',
                        field: 'category',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'SubCategory Name',
                        field: 'subCategory',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Enable/Disable',
                        field: 'delete',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Edit',
                        field: 'edit',
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
                <i className="fa fa-plus" aria-hidden="true" style={iconStyle} onClick={this.toggle1.bind(this)} id="TooltipExample"></i>
                <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggleTool.bind(this)}>
                    Add SubCategory
                </Tooltip>

                <MDBDataTable
                    style={{marginTop: '50px'}}
                    striped
                    bordered
                    hover
                    data={data}
                />
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit SubCategory</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="exampleEmail">SubCategory Name</Label>
                                        <Input type="text" value={this.state.subcategory} placeholder="Enter subcategory name" onChange={(e)=>{this.setState({subcategory:e.target.value})}}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.editSubCategory.bind(this)}>Edit</Button>{' '}
                        <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modal1} toggle={this.toggle1.bind(this)} className={this.props.className}>
                    <ModalHeader toggle={this.toggle1.bind(this)}>Add SubCategory</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="exampleSelect">Select Category</Label>
                                        <Input type="select" name="select" value={this.state.category} id="exampleSelect" onChange={(e)=>{this.setState({category:e.target.value})}}>
                                            <option>---select---</option>
                                            {this.props.category ?
                                                this.props.category.map(c=>
                                                    (
                                                        <option id={c.categoryId}>{c.categoryName}</option>
                                                    )
                                                )
                                            :null}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleEmail">SubCategory Name</Label>
                                        <Input type="text" placeholder="Enter subcategory name" value={this.state.subCategory} onChange={(e)=>{this.setState({subCategory:e.target.value})}}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleAddSubcategory.bind(this)}>Add Category</Button>{' '}
                        <Button color="secondary" onClick={this.toggle1.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return({
        data:state.admin.subcategory,
        category:state.admin.data
    })
}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({getSubCategory,subcategoryStatus,updateSubCategory,getCategory,addSubcategory},dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SubCategory))
