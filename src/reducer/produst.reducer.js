import {PRODUCT_DETAIL,RECENT_PRODUCT,SIMILAR_PRODUCT,ADD_RATING,GET_YOUR_RATING,GET_ALL_RATING,TOGGLE_MODAL} from '../action/actionType'

const init={
    data:{},
    product:{},
    rate:0,
    userRate:{},
    r1:0,
    r2:0,
    modalState: false

}

export default (state=init,action)=>{
    switch(action.type){
        case PRODUCT_DETAIL:
            return Object.assign({},state,{data: action.payload})
        case RECENT_PRODUCT:
            return Object.assign({},state,{product: action.payload})
        case SIMILAR_PRODUCT:
            return Object.assign({},state,{product: action.payload})
        case ADD_RATING:
            return Object.assign({},state,{rate: action.payload})
        case GET_YOUR_RATING:
            return Object.assign({},state,{rate: action.payload})
        case GET_ALL_RATING:
            return Object.assign({},state,{userRate: action.payload})
        case TOGGLE_MODAL:
            const actualState = state.modalState
            const newState = actualState === false ? true : false;
            return Object.assign({},state,{modalState: newState})

        default:
            return state
    }
}
