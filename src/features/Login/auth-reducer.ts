import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: initialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) => ({type: "login/SET-IS-LOGGED-IN", value} as const)


// thunks
export const loginTC: any = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data)
        .then((res) => {
            if (res.data.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC("succeeded"))

            } else {
                handleServerAppError(res.data.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC: any = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.logout()
        .then((res) => {
            if (res.data.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC("succeeded"))

            } else {
                handleServerAppError(res.data.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
type initialStateType = {
    isLoggedIn: boolean
}
type ActionsType = ReturnType<typeof setIsLoggedInAC>

