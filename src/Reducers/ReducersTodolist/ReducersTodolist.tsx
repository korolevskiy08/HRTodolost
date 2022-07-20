import React from 'react';
import {FilterValueType, TodolistType} from "../../App";

type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValueType
    id: string
}
type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}

export type ActionType = RemoveTodolistAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT | AddTodolistAT

export const todolistReducer = (state: Array<TodolistType>, action: ActionType):Array<TodolistType> => {
    switch (action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl )
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl )
        case "ADD-TODOLIST":
            return [{id: action.id, title: action.title, filter:'all'}, ...state]
        default :
            return state
    }
}

export const removeTodolistAC = (id:string):RemoveTodolistAT => ({type:'REMOVE-TODOLIST',id})
export const changeTodoListTitleAC = (title:string, id:string):ChangeTodoListTitleAT =>({type:"CHANGE-TODOLIST-TITLE", title, id})
export const changeTodoListFilterAC = (filter: FilterValueType, id: string):ChangeTodoListFilterAT => ({type:"CHANGE-TODOLIST-FILTER", filter, id})
export const addTodolistAC = (title: string, id: string):AddTodolistAT => ({type: "ADD-TODOLIST", title, id})