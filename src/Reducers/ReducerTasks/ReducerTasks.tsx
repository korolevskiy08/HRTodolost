import {TaskStateType} from "../../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "../ReducersTodolist/ReducersTodolist";

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

export type ActionType = RemoveTaskAT
    | ChangeTaskStatusAT
    | AddTaskAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT

export const reducerTasks = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskID)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {...el, isDone: action.isDone} : el)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskID ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistID]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK', taskID, todolistID
    } as const
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistID
    } as const
}
export const addTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK', title, todolistID
    } as const
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE', taskID, title, todolistID
    } as const
}