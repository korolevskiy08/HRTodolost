import React, {ChangeEvent, useState} from 'react';
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
