import React, {ChangeEvent, useState} from 'react';
import classes from './TodoListComponent.module.css'
import {EditabledSpanComponent} from "../EditabledSpanComponent/EditabledSpanComponent";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Button, IconButton} from "@material-ui/core";
import {FilterValueType} from "../App";
import DeleteIcon from '@material-ui/icons/Delete';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoListType = {
    filter: FilterValueType
    todolistID: string
    todolistTitle: string
    tasks: Array<TasksType>
    removeTask: (todolistID: string, taskID: string) => void
    changeCheckBoxStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    addTask: (todolistID: string, title: string) => void
    filteredTask: (todolistID: string, value: FilterValueType) => void
    removeTodolist: (removeTodolist: string) => void
    changeTodoListTitle: (todolistID: string, title: string) => void
    changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
}

export const TodoList = ({
                             filter,
                             tasks,
                             removeTask,
                             changeCheckBoxStatus,
                             addTask,
                             filteredTask,
                             todolistTitle,
                             todolistID,
                             removeTodolist,
                             changeTaskTitle,
                             changeTodoListTitle
                         }: TodoListType) => {

    const removeTaskHandler = (todolistID: string, taskID: string) => removeTask(todolistID, taskID)
    const changeCheckBoxHandler = (taskID: string, isDone: boolean) => changeCheckBoxStatus(todolistID, taskID, isDone)

    const filteredTaskHandler = (value: FilterValueType) => {
        filteredTask(todolistID, value)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistID)
    }

    const changeTodoListTitleHandler = (title: string) => {
        changeTodoListTitle(todolistID, title)
    }

    const addTaskHandler = (title: string) => {
        addTask(todolistID, title)
    }



    return (
        <div>
            <ul>
                <div className={classes.todolistHeader}>
                    <EditabledSpanComponent title={todolistTitle} changeTitle={changeTodoListTitleHandler}/>
                    <IconButton
                        size={'small'}
                        onClick={removeTodolistHandler}
                        aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
                <div>
                    <AddItemForm
                        addItem={addTaskHandler}
                    />
                </div>


                {tasks.map(el => {


                    const changeTaskTitleHandler = (title: string) => {
                        changeTaskTitle(todolistID, el.id, title)
                    }


                    return (
                        <li key={el.id} className={classes.taskItem}>
                            <input
                                onChange={(e) => changeCheckBoxHandler(el.id, e.currentTarget.checked)}
                                type={'checkbox'}
                                checked={el.isDone}
                            />
                            <EditabledSpanComponent title={el.title} changeTitle={changeTaskTitleHandler}/>
                            <IconButton
                                size={'small'}
                                onClick={() => removeTaskHandler(todolistID, el.id)}
                                aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </li>
                    )
                })}
            </ul>

            <Button
                style={filter === 'all' ?{backgroundColor: '#5B7065'} : {backgroundColor: '#C9D1C8'}}
                variant={"contained"}
                size={'small'}
                onClick={() => filteredTaskHandler('all')}
            >
                All
            </Button>
            <Button
                style={filter === 'active' ? {backgroundColor: '#5B7065'} : {backgroundColor: '#C9D1C8'}}
                variant={"contained"}
                size={'small'}
                onClick={() => filteredTaskHandler('active')}
            >
                Active
            </Button>
            <Button
                style={filter === 'completed' ?{backgroundColor: '#5B7065'} : {backgroundColor: '#C9D1C8'}}
                variant={"contained"}
                size={'small'}
                onClick={() => filteredTaskHandler('completed')}
            >
                Completed
            </Button>
        </div>
    );
};

