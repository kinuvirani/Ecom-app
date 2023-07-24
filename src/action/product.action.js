import {
    ProductStatus,
    PRODUCT_DETAIL,
    RECENT_PRODUCT,
    SIMILAR_PRODUCT,
    GetProducts,
    AddOffer,
    AddProduct,
    ADD_RATING,
    GET_YOUR_RATING,
    GET_ALL_RATING,
    TOGGLE_MODAL
} from "./actionType";
import api from '../service/baseSerivice'

export const getProduct=(id)=>{
    return ((dispatch)=>{
        api.get(`product/get/product/${id}`).then((response)=>{
            dispatch({
                type: PRODUCT_DETAIL,
                payload: response.data[0]
            })
        }).catch((error)=>{
            console.log("Error===",error)
        })
    })
}

export const recentProduct=()=>{
    return ((dispatch)=>{
        api.get(`product/get/recent`).then((response)=>{
            dispatch({
                type: RECENT_PRODUCT,
                payload: response.data
            })
        }).catch((error)=>{
            console.log("Error===",error)
        })
    })
}

export const similarProduct=(id,pid)=>{
    return ((dispatch)=>{
        api.get(`product/similar/product/${id}/${pid}`).then((response)=>{
            dispatch({
                type: SIMILAR_PRODUCT,
                payload: response.data
            })
        }).catch((error)=>{
            console.log("Error===",error)
        })
    })
}

export const getProductCount=()=>{
    return(dispatch)=>{
        return api.get(`product/get/products`).then((response)=>{
            dispatch({
                type:GetProducts,
                payload:response.data.data,
                count:response.data.count
            })
        }).catch((err)=>{
            console.log("Error==",err)
        })
    }
}
export const productStatus=(data,id)=>{
    return(dispatch)=>{
        return api.put(`product/update/status/${id}`,data).then((response)=>{
            dispatch({
                type:ProductStatus,
                id:id,
                payload:response.data
            })
        }).catch((err)=>{
            console.log("Error==",err)
        })
    }
}

export const addOffer=(data,id)=>{
    return(dispatch)=>{
        return api.put(`product/add/offer/${id}`,data).then((response)=>{
            dispatch({
                type:AddOffer,
                id:id,
                payload:response.data
            })
        }).catch((err)=>{
            console.log("Error==",err)
        })
    }
}

export const addProduct=(data,cid,sid,config)=>{
    return(dispatch)=>{
        return api.post(`product/save/${cid}/${sid}`,data,config).then((response)=>{
            dispatch({
                type:AddProduct,
                payload:response.data.data
            })
        }).catch((err)=>{
            console.log("Error==",err.response.data)
        })
    }
}

export const addRate=(data,uid,pid)=>{
    return ((dispatch)=>{
        api.post(`rate/save/${uid}/${pid}`,data).then((response)=>{
            dispatch({
                type: ADD_RATING,
                payload: response.data.rating
            })
        }).catch((error)=>{
            console.log("Error===",error)
        })
    })
}
export const getYourRating=(uid,pid)=>{
    return(dispatch)=>{
         api.get(`rate/get/${uid}/${pid}`).then((response)=>{
             if(response.data){
                 dispatch({
                      type:GET_YOUR_RATING,
                      payload:response.data.rating
                 })
             }
             else
             {
                 dispatch({
                     type:GET_YOUR_RATING,
                     payload:0
                 })
             }
        }).catch((err)=>{
            console.log("Error==",err)
        })
    }
}

export const getAllRating=(pid)=>{
    return(dispatch)=>{
        api.get(`rate/total/${pid}`).then((response)=>{
            console.log("Response===",response)
            console.log("Response data===",response.data)
            let rate1=response.data.filter((d)=>{
                if(d.rating===1)
                    return d.count
                else
                    return 0
            }).map((d)=>d.count)
            let rate2=response.data.filter((d)=>{
                if(d.rating===2)
                    return d.count
                else
                    return 0
            }).map((d)=>d.count)
            let rate3=response.data.filter((d)=>{
                if(d.rating===3)
                    return d.count
                else
                    return 0
            }).map((d)=>d.count)

            let rate4=response.data.filter((d)=>{
                if(d.rating===4)
                    return d.count
                else
                    return 0
            }).map((d)=>d.count)
            let rate5=response.data.filter((d)=>{
                if(d.rating===5)
                    return d.count
                else
                    return 0
            }).map((d)=>d.count)
            let filter={
                r1:(rate1>0? parseInt(rate1):0),
                r2:(rate2>0? parseInt(rate2):0),
                r3:(rate3>0? parseInt(rate3):0),
                r4:(rate4>0? parseInt(rate4):0),
                r5:(rate5>0? parseInt(rate5):0)
            }
                dispatch({
                    type:GET_ALL_RATING,
                    payload:filter
                })
        }).catch((err)=>{
            console.log("Error==",err)
        })
    }
}

export const toggleProduct=()=>{
    return{
        type:TOGGLE_MODAL
    }
}
