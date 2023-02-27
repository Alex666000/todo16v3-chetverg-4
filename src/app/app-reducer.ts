import {Dispatch} from "redux";
import {setIsLoggedInAC, SetIsLoggedInActionType} from "../features/Login/auth-reducer";
import {authAPI} from "../api/todolists-api";
import {handleServerNetworkError} from "../utils/error-utils";

const initialState: InitialStateType = {
    status: "idle",
    error: null,
    isInitialize: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialize: action.value}

        default:
            return {...state}
    }
}

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true - когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialize: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setIsInitializedAC = (value: boolean) => ({type: "APP/SET-IS-INITIALIZED", value} as const)

// thunks
// т к при перезагрузке стр. isLoggedIn скидывается с true а false то надо при загрузке (перезагрузке)
// сделать логику инициализации Арр
// как только приложение в App стратует диспатчим санку — т.е определим сразу же залогинены ли мы?
export const initializedAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.me().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            // dispatch(setIsInitializedAC(true))
        }
        dispatch(setAppStatusAC("succeeded"))
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetIsInitializedACActionType = ReturnType<typeof setIsInitializedAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetIsInitializedACActionType
    | SetIsLoggedInActionType
