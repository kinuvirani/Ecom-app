import {combineReducers} from 'redux'
import register from './registration.reducer'
import category from './category.reducer'
import detail from './produst.reducer'
import cart from './cart.reducer'
import admin from './admin.reducer'

export default combineReducers({register,category,detail,cart,admin})
