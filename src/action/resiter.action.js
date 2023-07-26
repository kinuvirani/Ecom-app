import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_SUCCESS,
    LOGOUT,
    Edit_PROFILE,
    VIEW_PROFILE,
    Edit_ADDRESS,
    LOGIN_FAILED,
    Change_Password,
    Change_Password_Fail, GetUsers, UserStatus
} from "./actionType";
import api from '../service/baseService'

export const registerUser = (data) => {
    return (dispatch) => {
        return api.post('user/add', data).then((response) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response
            })
        }).catch((err) => {
            dispatch({
                type: REGISTER_FAILED,
                error: err.response.data
            })
        })
    }
}
export const loginUser = (data) => {
    return (dispatch) => {
        return api.post('user/login', data).then((response) => {
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("email", response.data.email)
                localStorage.setItem("register_id", response.data.register_id)
                localStorage.setItem("role", response.data.role)
                dispatch({
                    type: LOGIN_SUCCESS,
                    token: response.data.token,
                    email: response.data.email,
                    register_id: response.data.register_id,
                    role: response.data.role,
                    payload: response.data
                });
            }
        }).catch((err) => {
            dispatch({
                type: LOGIN_FAILED,
                error: err.response.data
            });
        })
    }
}
export const editProfile = (data, id) => {
    return (dispatch) => {
        return api.put(`user/edit/profile/${id}`, data).then((response) => {
            localStorage.removeItem("register_id");
            localStorage.setItem("register_id", response.data.register_id)
            dispatch({
                type: Edit_PROFILE,
                payload: response.data[0]
            })
        }).catch((err) => {
            console.log("Error==", err)
        })
    }
}
export const editAddress = (data, id) => {
    return (dispatch) => {
        api.put(`user/edit/address/${id}`, data).then((response) => {
            localStorage.removeItem("register_id");
            localStorage.setItem("register_id", response.data.register_id)
            dispatch({
                type: Edit_ADDRESS,
                payload: response.data[0]
            })
        }).catch((err) => {
            console.log("Error==", err)
        })
    }
}
export const viewProfile = (id) => {
    return (dispatch) => {
        return api.get(`user/get/${id}`).then((response) => {
            dispatch({
                type: VIEW_PROFILE,
                payload: response.data[0]
            })
        }).catch((err) => {
            console.log("Error==", err)
        })
    }
}

export const changePassword = (data, id) => {
    return (dispatch) => {
        return api.put(`user/edit/password/${id}`, data).then((response) => {
            localStorage.removeItem("register_id");
            localStorage.setItem("register_id", response.data.register_id)
            dispatch({
                type: Change_Password,
                payload: response.data
            })
        }).catch((err) => {
            dispatch({
                type: Change_Password_Fail,
                error: err.response.data
            })
        })
    }
}

export const getUser = () => {
    return (dispatch) => {
        return api.get(`user/get/all/data`).then((response) => {
            dispatch({
                type: GetUsers,
                payload: response.data.data,
                count: response.data.count
            })
        }).catch((err) => {
            console.log("Error==", err)
        })
    }
}

export const updateUserStatus = (data, id) => {
    return (dispatch) => {
        api.put(`user/update/status/${id}`, data).then((response) => {
            localStorage.removeItem("register_id");
            localStorage.setItem("register_id", response.data.register_id)
            dispatch({
                type: UserStatus,
                id: id,
                payload: response.data
            })
        }).catch((err) => {
            console.log("Error==", err)
        })
    }
}

export const logoutuser = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("register_id");
        localStorage.removeItem("role")
    }
};
