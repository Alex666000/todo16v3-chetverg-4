import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {Simulate} from "react-dom/test-utils";
import {clearTodosDataAC, ClearTodosDataACActionType} from "../TodolistsList/todolists-reducer";


const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: initialStateType = initialState, action: AuthActionsType): initialStateType => {
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

// обобщается экшенами которые использует AuthActionsType
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data).then((res) => {
        if (res.data.resultCode === 0) {
// когда придет ответ с сервера мы
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleServerAppError(res.data, dispatch)
        }

    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.logout().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC("succeeded"))
            // зачищаем
            dispatch(clearTodosDataAC())
        } else {
            handleServerAppError(res.data, dispatch)
        }

    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
type initialStateType = typeof initialState

export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>

export type AuthActionsType = SetIsLoggedInActionType | SetAppStatusActionType | SetAppErrorActionType | ClearTodosDataACActionType



