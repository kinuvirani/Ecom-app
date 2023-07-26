import {
  AddToCart,
  AddToCartFail,
  UpdateProductQuantity,
  CheckInCart,
  MYCART,
  DeleteItem,
  UpdateQTY,
  PlaceOrder,
  LocalCart,
  UserOrder,
} from "./actionType";
import api from "../service/baseService";

export const addProductToCart = (pid) => {
  let id = localStorage.getItem("register_id");
  return (dispatch) => {
    return api
      .post(`cart/save?uid=${id}&pid=${pid}`)
      .then((response) => {
        dispatch({
          type: AddToCart,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: AddToCartFail,
          error: error.response.data,
        });
      });
  };
};

export const tempCart = () => {
  let id = localStorage.getItem("register_id");
  let localItems = localStorage.getItem("cartItem");
  let ary = localItems.split(",");
  ary.map((pid) => {
    api.post(`cart/save?uid=${id}&pid=${pid}`);
    localStorage.removeItem("cartItem");
  });
};

export const checkItemInCart = (uid, pid) => {
  return (dispatch) => {
    api
      .get(`cart/get/${uid}/${pid}`)
      .then((response) => {
        dispatch({
          type: CheckInCart,
          count: response.data.count,
        });
      })
      .catch((error) => {
        console.log("Error==", error);
      });
  };
};

export const myCart = (uid) => {
  return (dispatch) => {
    return api
      .get(`cart/get/${uid}`)
      .then((response) => {
        dispatch({
          type: MYCART,
          payload: response.data.rows,
          count: response.data.count,
        });
      })
      .catch((error) => {
        console.log("Error==", error);
      });
  };
};
export const deleteItem = (pid) => {
  let id = localStorage.getItem("register_id");
  return (dispatch) => {
    return api
      .delete(`cart/delete/${id}/${pid}`)
      .then((response) => {
        dispatch({
          type: DeleteItem,
          msg: response.data,
          productId: pid,
        });
      })
      .catch((error) => {
        console.log("Error==", error.response.data);
      });
  };
};

export const UpdateQty = (id, qty) => {
  return (dispatch) => {
    return api
      .put(`cart/update/${id}`, qty)
      .then((response) => {
        dispatch({
          type: UpdateQTY,
          id: id,
          qty: qty.quantity,
          payload: response.data[0],
        });
      })
      .catch((error) => {
        console.log("Error==", error);
      });
  };
};

// export const localCart=()=>{
//
//     let localItems=localStorage.getItem('cartItem')
//     let ary=localItems.split(',')
//     console.log("array=",localItems)
//     // ary.map((pid)=>{
//     //     console.log('pid===',pid)
//     //     // api.get(`product/get/product/${pid}`)
//     // })
// }

export const localCart = () => {
  let data = [];
  let localItems = localStorage.getItem("cartItem");
  let ary = localItems.split(",");
  let len = ary.length;
  return (dispatch) => {
    ary.map((pid) => {
      api
        .get(`product/get/product/${pid}`)
        .then((response) => {
          let so = response.data[0];
          data.push(so);
          dispatch({
            type: LocalCart,
            payload: data,
            count: len,
          });
        })
        .catch((error) => {
          console.log("Error===", error);
        });
    });
  };
};

export const placeOrder = () => {
  let id = localStorage.getItem("register_id");
  return (dispatch) => {
    api
      .put(`cart/update/status/${id}`)
      .then((response) => {
        dispatch({
          type: PlaceOrder,
          id: id,
        });
      })
      .catch((error) => {
        console.log("Error===", error);
      });
  };
};

export const userOrder = () => {
  let id = localStorage.getItem("register_id");
  return (dispatch) => {
    api
      .get(`cart/get/order/detail/${id}`)
      .then((response) => {
        dispatch({
          type: UserOrder,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("response===", error);
      });
  };
};

export const updateProductQuantity = (pid, qty) => {
  return (dispatch) => {
    api
      .put(`product/update/quantity/${pid}/${qty}`)
      .then((response) => {
        dispatch({
          type: UpdateProductQuantity,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("Error==", error.response.data);
      });
  };
};
