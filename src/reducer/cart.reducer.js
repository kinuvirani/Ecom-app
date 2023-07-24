import { AddToCart, AddToCartFail, UpdateProductQuantity,CheckInCart, MYCART,DeleteItem,UpdateQTY,LocalCart,PlaceOrder,UserOrder} from '../action/actionType'

const init = {
    cart: [],
    error: '',
    count: 0,
    success:'',
    notificationCount:0,
    localCount:0,
    order:{}
}

export default (state = init, action) => {
    switch (action.type) {
        case AddToCart:
            let addToCart = state.cart;
            addToCart.push(action.payload)
            return Object.assign({}, state, { cart: [...addToCart], error: '' })
        case AddToCartFail:
            return Object.assign({}, state, { cart: '', error: action.error })
        case CheckInCart:
            if(localStorage.getItem('token'))
            {
                return Object.assign({}, state, { count: action.count })
            }
            else {
                return Object.assign({}, state, { count: 0 })
            }

        case MYCART:
            if(localStorage.getItem('token'))
            {
                return Object.assign({}, state, { cart: [...action.payload ],notificationCount:action.count})
            }
            else
            {
                return Object.assign({}, state, { cart: '',notificationCount:0 })
            }

        case UpdateQTY:
            let id=action.id;
            let qty=action.qty
            let updateData=state.cart.map((d)=>{
                return d.id===id?d.quantity=qty:d
            })
        case DeleteItem:
            let ditem=action.productId
            const data=state.cart.filter((cart)=>parseInt(cart.productId)!==parseInt(ditem))
            return Object.assign({}, state, { success: action.msg,cart:data})
        case LocalCart:
            return Object.assign({}, state, { cart: [...action.payload] ,localCount:action.count})
        case PlaceOrder:
            return Object.assign({}, state, { cart: ''})
        case UserOrder:
            return Object.assign({}, state, { order:action.payload , error: '' })
        case UpdateProductQuantity:

        default:
            return state
    }
}
