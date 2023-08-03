import {applyMiddleware,compose,createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from  './reducer/index'

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);
const token=localStorage.getItem("token")
const email=localStorage.getItem("email")
const register_id=localStorage.getItem("register_id")
const role=localStorage.getItem("role")

const init={
    register:{
        token:'',
        email:'',
        register_id:'',
        role:''
    }
}

if(token && email && register_id && role)
{
    init.register.token=token;
    init.register.email=email;
    init.register.register_id=register_id;
    init.register.role=role;
}

export default createStore(rootReducer,init,enhancer);
