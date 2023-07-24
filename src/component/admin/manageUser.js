import React from 'react'
import { MDBDataTable } from 'mdbreact';
import { Switch } from 'antd';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

import {getUser,updateUserStatus} from "../../action/resiter.action";

class User extends React.Component{
    componentWillMount() {
        this.props.getUser()
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
        this.props.updateUserStatus(data,id)
    }
    render(){
        let result=[]
        this.props.data.map((d)=>{
            result.push({
                firstname:d.firstname+" "+d.lastname,
                // firstname:d.register_id,
                email:d.email,
                mobileNo:d.mobileNo,
                address:d.address,
                // delete:<i className = "fa fa-trash fa-2x" style={{color:'red',paddingLeft:'100px'}} href=''></i>
                delete:<Switch id={d.register_id} checked={d.status===1?'true':null} onChange={this.onChange.bind(this)} />
            })
        })
        const data={
            columns:
            [
                {
                    label: 'Firstname',
                    field: 'firstname',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'MobileNo',
                    field: 'mobileNo',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Address',
                    field: 'address',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: '',
                    field: 'delete',
                    sort: 'asc',
                    width: 100
                }
            ],
            rows:result
        }

        return(
            <MDBDataTable
                striped
                bordered
                hover
                data={data}
            />
        )
    }
}

const mapStateToProps=(state)=>{
    return({
        data:state.admin.data
    })
}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({getUser,updateUserStatus},dispatch)
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(User))
