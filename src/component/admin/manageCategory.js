import React from 'react'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Tooltip, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import { Switch } from 'antd';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

import {getCategory,categoryStatus,updateCategory,addCategory} from "../../action/category.action";
import Alert from "react-s-alert";

class Category extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            category:'',
            id:0,
            modal1:false,
            tooltipOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }
    getData(e) {
        this.setState(prevState => ({
            category:e.categoryName,
            id:e.categoryId
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
    componentWillMount() {
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
        this.props.categoryStatus(data,id).then((doc)=>{
            Alert.success(data.status===1?'Product enabled successfully!!!':'Product disabled successfully!!!', {
                position: 'top-right'
            });
        })
    }
    editCategory(e){
        let data={
            categoryName:this.state.category
        }
        this.props.updateCategory(data,this.state.id)
        this.setState({category:''})
        this.toggle()
    }
    addCategory(e){
        let data={
            categoryName:this.state.category
        }
        this.props.addCategory(data)
        this.setState({category:''})
        this.toggle1()
    }
    render(){
        let result=[]
        this.props.data.map((d)=>{
            result.push({
                id:d.categoryId,
                category:d.categoryName,
                delete:<Switch id={d.categoryId} checked={d.status===1?'true':null} onChange={this.onChange.bind(this)} />,
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
                    Add Category
                </Tooltip>
                {/*<Button color="success" style={{width:'150px',height:'50px'}}>Add Category</Button>*/}
                <MDBDataTable
                    style={{marginTop: '50px'}}
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
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="exampleEmail">Category Name</Label>
                                        <Input type="text" value={this.state.category} placeholder="Enter category name" onChange={(e)=>{this.setState({category:e.target.value})}}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.editCategory.bind(this)}>Edit</Button>{' '}
                        <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modal1} toggle={this.toggle1.bind(this)} className={this.props.className}>
                    <ModalHeader toggle={this.toggle1.bind(this)}>Add Category</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="exampleEmail">Category Name</Label>
                                        <Input type="text" value={this.state.category} placeholder="Enter category name" onChange={(e)=>{this.setState({category:e.target.value})}}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addCategory.bind(this)}>Add Category</Button>{' '}
                        <Button color="secondary" onClick={this.toggle1.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return({
        data:state.admin.data
    })
}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({getCategory,categoryStatus,updateCategory,addCategory},dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Category))
