import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditabledSpanComponentType = {
    changeTitle: (title: string) => void
    title: string
}

export const EditabledSpanComponent = ({title, changeTitle}: EditabledSpanComponentType) => {
    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState<string>(title)

    const onEditMode = () =>{
        setEditMode(true)
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const offEditMode = () => {
        setEditMode(false)
        changeTitle(text)
    }

    return (
        <div>
            {editMode
                ? <TextField
                    value={text}
                    onChange={onChangeSetTitle}
                    onBlur={offEditMode}
                    autoFocus
                />
                : <span
                onDoubleClick={onEditMode}
                >{title}</span>
            }

        </div>
    );
};

