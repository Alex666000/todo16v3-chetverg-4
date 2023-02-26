import {Dispatch} from "redux";

const initialState = {}

export const loginReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {

        default:
            return state
    }
}

// actions
// export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)


// thunks
export const fetchTasksTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {

}

// types

type ActionsType = any

