import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import {IconButton, TextField} from "@material-ui/core";


type NewFormComponentType = {
    addItem: (title: string) => void

}

export const AddItemForm = ({addItem}:NewFormComponentType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)



    const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.currentTarget.value
        setTitle(newTitle)
        error && setError(false)
    }

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError(true)
        }
    }

    const onKeyDawnHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.ctrlKey && e.key === 'Enter') addTaskHandler()
    }

    return (
        <div>
            <TextField
                size={'small'}
                label="Add new item"
                variant="outlined"
                value={title}
                onChange={onChangeTaskTitleHandler}
                error={error}
                helperText={error && 'Title is required!'}
                onKeyDown={onKeyDawnHandler}
            />

            <IconButton
                size={'small'}
                onClick={addTaskHandler}
                aria-label="add item">
                <ControlPointIcon />
            </IconButton>


        </div>
    );
};
