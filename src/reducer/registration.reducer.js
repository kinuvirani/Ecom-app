import {REGISTER_SUCCESS,REGISTER_FAILED,LOGIN_SUCCESS,LOGOUT,Edit_PROFILE,VIEW_PROFILE,Edit_ADDRESS,
    Change_Password_Fail,LOGIN_FAILED,Change_Password} from "../action/actionType";

const init={
    user:'',
    err:'',
    login:{},
    token:'',
    email:'',
    register_id:'',
    profile:'',
    address:'',
    psw:{},
    role:''
}

export default (state=init,action)=>{
    switch (action.type) {
        case REGISTER_SUCCESS:
            return Object.assign({},state,{user:action.payload,err:''})
        case REGISTER_FAILED:
            return Object.assign({},state,{err:action.error})
        case LOGIN_SUCCESS:
           return Object.assign({},state,{token:action.token,err:'',login:action.payload,register_id:action.register_id,email:action.email,role:action.role})
        case LOGIN_FAILED:
            return Object.assign({},state,{err:action.error})
        case Edit_PROFILE:
            return Object.assign({},state,{profile:action.payload,user:action.payload})
        case Edit_ADDRESS:
            return Object.assign({},state,{address:action.payload,user:action.payload})
        case Change_Password:
            return Object.assign({},state,{psw:action.payload,err:''})
        case Change_Password_Fail:
            return Object.assign({},state,{err:action.error})
        case VIEW_PROFILE:
            return Object.assign({},state,{user:action.payload})
        case LOGOUT:
            return Object.assign({},state,{token:'',err:'',register_id:'',role:'',email:''})
        default:
            return state
    }
}
