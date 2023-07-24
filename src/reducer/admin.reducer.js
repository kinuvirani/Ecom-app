import {
    GetUsers,
    GetProducts,
    GetCategory,
    GetSubCategory,
    UserStatus,
    ProductStatus,
    CategoryStatus,
    SubCategoryStatus,
    AddCategory,
    AddOffer,
    UpdateCategory,
    UpdateSubCategory,
    AddSubCategory,SUBCATEGORY,
    AddProduct
} from '../action/actionType'

const init={
    data:{},
    subcategory:{},
    product:{},
    pdata:{},
    ucount:0,
    pcount:0,
    scount:0,
    ccount:0
}

export default (state=init,action)=>{
    switch (action.type) {
        case GetUsers:
            return Object.assign({},state,{ucount:action.count,data:action.payload})

        case GetProducts:
            return Object.assign({},state,{pcount:action.count,product:action.payload})

        case GetCategory:
            return Object.assign({},state,{ccount:action.count,data:action.payload})

        case GetSubCategory:
            return Object.assign({},state,{scount:action.count,subcategory:action.payload})

        case UserStatus:
            let uid=action.id
            let val=state.data.map((d)=>{
                return d.register_id===uid?action.payload[0]:d;
            })
            return Object.assign({},state,{data:val})

        case ProductStatus:
            let pid=action.id
            let pval=state.product.map((d)=>{
                return parseInt(d.productId)===parseInt(pid)?action.payload[0]:d;
            })
            return Object.assign({},state,{product:pval})

        case CategoryStatus:
            let cid=action.id
            let cval=state.data.map((d)=>{
                return parseInt(d.categoryId)===parseInt(cid)?action.payload[0]:d;
            })
            return Object.assign({},state,{data:cval})

        case UpdateCategory:
            let cid1=action.id
            let cval1=state.data.map((d)=>{
                return parseInt(d.categoryId)===parseInt(cid1)?action.payload:d;
            })
            return Object.assign({},state,{data:cval1})

        case AddOffer:
            let pid1=action.id
            let pval1=state.product.map((d)=>{
                return parseInt(d.productId)===parseInt(pid1)?action.payload[0]:d;
            })
            return Object.assign({},state,{product:pval1})

        case AddCategory:
            let val1=[...state.data ,action.payload]
            return Object.assign({},state,{data:val1})

        case SubCategoryStatus:
            let sid=action.id
            let sval=state.subcategory.map((d)=>{
                return parseInt(d.subCategoryId)===parseInt(sid)?action.payload[0]:d;
            })
            return Object.assign({},state,{subcategory:sval})

        case UpdateSubCategory:
            let sid1=action.id
            let sval1=state.subcategory.map((d)=>{
                return parseInt(d.subCategoryId)===parseInt(sid1)?action.payload[0]:d;
            })
            return Object.assign({},state,{subcategory:sval1})

        case AddSubCategory:
            let sadd=[...state.subcategory,action.payload]
            return Object.assign({},state,{subcategory:sadd})

        case SUBCATEGORY:
            return Object.assign({},state,{subcategory:action.payload})

        case AddProduct:
            let data=[...state.product,action.payload]
            console.log("data===",data)
            return Object.assign({},state,{product:data})

        default:
            return state
    }
}
