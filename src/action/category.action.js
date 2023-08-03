import {
    CATEGORY,
    SUBCATEGORY,
    PRODUCTCATEGORY,
    VIEW_PRODUCTS,
    GetCategory,
    GetSubCategory,
    CategoryStatus,
    UpdateCategory,
    FILTER_PRODUCT,
    AddCategory,
    SubCategoryStatus,
    UpdateSubCategory,
    AddSubCategory
} from "./actionType";
import api from '../service/baseService'

export const viewCategory=()=>{
    return((dispatch)=>{
        api.get('category/get').then((response)=> {
            dispatch({
                type: CATEGORY,
                payload: response.data
            })

    }).catch((error)=>{
            console.log("Error===",error)
        })
    })
}

export const viewSubCategory=(id)=>{
    return((dispatch)=>{
        api.get(`subCategory/get/${id}`).then((response)=> {
            dispatch({
                type: SUBCATEGORY,
                payload: response.data
            })
        }).catch((error)=>{
            console.log("Error===",error)
        })
    })
}

export const viewProductCategory=(id)=>{
    return((dispatch)=>{
        api.get(`productCategory/get/${id}`).then((response)=> {
            dispatch({
                type: PRODUCTCATEGORY,
                payload: response.data
            })
        }).catch((error)=>{
            console.log("Error===",error)
        })
    })
}

export const viewAllProductCategory=()=>{
    return((dispatch)=>{
        return api.get(`productCategory/get`).then((response)=> {
            dispatch({
                type: PRODUCTCATEGORY,
                payload: response.data
            })
        }).catch((error)=>{
            console.log("Error===",error)
        })
    })
}

// export const viewProduct=(pno,psize)=>{
//     return((dispatch)=>{
//         api.get(`product/get/${pno}/${psize}`).then((response)=> {
//             dispatch({
//                 type: VIEW_PRODUCTS,
//                 payload: response.data
//             })
//         }).catch((error)=>{
//             console.log("Error===",error)
//         })
//     })
// }

export const viewProduct=()=>{
    return((dispatch)=>{
        api.get(`product/get/all`).then((response)=> {
            dispatch({
                type: VIEW_PRODUCTS,
                payload: response.data
            })
        }).catch((error)=>{
            console.log("Error===",error)
        })
    })
}

export const viewProductByProductCategory=(id,pno,psize)=>{
    return((dispatch)=>{
        api.get(`product/get/productcategory/${id}/${pno}/${psize}`).then((response)=> {
          dispatch({
                type: VIEW_PRODUCTS,
                payload: response.data
            })
        }).catch((error)=>{
            console.log("Error===",error)
        })
    })
}

export const viewProductBySubcategory=(id)=>{
    return((dispatch)=>{
        api.get(`product/get/subcategory/${id}`).then((response)=> {
            dispatch({
                type: VIEW_PRODUCTS,
                payload: response.data
            })
        }).catch((error)=>{
            console.log("Error===",error)
        })
    })
}
export const viewProductByKeyword=(pname,pno,psize)=>{
    return((dispatch)=>{
        api.get(`product/get/${pname}/${pno}/${psize}`).then((response)=> {
            dispatch({
                type: VIEW_PRODUCTS,
                payload: response.data.data
            })
        }).catch((error)=>{
            console.log("Error===",error)
        })
    })
}
export const getCategory=()=>{
    return(dispatch)=>{
        return api.get(`category/get/category`).then((response)=>{
            dispatch({
                type:GetCategory,
                count:response.data.count,
                payload:response.data.data
            })
        }).catch((err)=>{
            console.log("Error==",err)
        })
    }
}

export const getSubCategory=()=>{
    return(dispatch)=>{
        return api.get(`subCategory/get/sub/count`).then((response)=>{
            dispatch({
                type:GetSubCategory,
                count:response.data.count,
                payload:response.data.data
            })
        }).catch((err)=>{
            console.log("Error==",err)
        })
    }
}
export const categoryStatus=(data,id)=>{
    return(dispatch)=>{
       return api.put(`category/update/status/${id}`,data).then((response)=>{
            dispatch({
                type:CategoryStatus,
                id:id,
                payload:response.data
            })
        }).catch((err)=>{
            console.log("Error==",err)
        })
    }
}

export const subcategoryStatus=(data,id)=>{
    return(dispatch)=>{
        return api.put(`subCategory/update/status/${id}`,data).then((response)=>{
            dispatch({
                type:SubCategoryStatus,
                id:id,
                payload:response.data
            })
        }).catch((err)=>{
            console.log("Error==",err)
        })
    }
}

export const updateCategory=(data,id)=>{
    return(dispatch)=>{
        api.put(`category/edit/${id}`,data).then((response)=>{
            dispatch({
                type:UpdateCategory,
                id:id,
                payload:response.data
            })
        }).catch((err)=>{
            console.log("Error==",err)
        })
    }
}

export const updateSubCategory=(data,id)=>{
    return(dispatch)=>{
        api.put(`subCategory/edit/${id}`,data).then((response)=>{
            dispatch({
                type:UpdateSubCategory,
                id:id,
                payload:response.data
            })
        }).catch((err)=>{
            console.log("Error==",err)
        })
    }
}

export const addCategory=(data)=>{
    return(dispatch)=>{
        api.post(`category/save`,data).then((response)=>{
            console.log("state data==",response.data)
            dispatch({
                type:AddCategory,
                payload:response.data
            })
        }).catch((err)=>{
            console.log("Error==",err)
        })
    }
}

export const addSubcategory=(data,id)=>{
    return(dispatch)=>{
        return api.post(`subCategory/save/${id}`,data).then((response)=>{
            console.log("state data[0]==",response.data[0])
            dispatch({
                type:AddSubCategory,
                payload:response.data[0]
            })
        }).catch((err)=>{
            console.log("Error==",err)
        })
    }
}

export const filterProduct=(min,max)=>{
    return(dispatch)=>{
        return api.get(`product/get/filter/product/${min}/${max}`).then((response)=>{
            console.log("response dat==",response.data)
            dispatch({
                type:FILTER_PRODUCT,
                payload:response.data
            })
        }).catch((err)=>{
            console.log("Error==",err)
        })
    }
}
