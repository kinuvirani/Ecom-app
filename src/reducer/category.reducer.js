import { CATEGORY,SUBCATEGORY,PRODUCTCATEGORY,VIEW_PRODUCTS,FILTER_PRODUCT } from "../action/actionType";

const item={
    category:{},
    subCategoty:{},
    productCategory:'',
    products:'',
    count:0
}
export default (state=item,action)=>{
    switch(action.type){
        case CATEGORY:
            return Object.assign({},state,{category: action.payload})
        case SUBCATEGORY:
            return Object.assign({},state,{subCategoty: action.payload})
        case PRODUCTCATEGORY:
            return Object.assign({},state,{productCategory: action.payload})
        case VIEW_PRODUCTS:
            return Object.assign({},state,{products: action.payload})
        case FILTER_PRODUCT:

            return Object.assign({},state,{products: action.payload})
        default :
            return state
    }
}
