import { TextField } from '@material-ui/core';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

export type EditSpanPropsType = {
    title: string
    renameItem: (newItemTitle: string) => void
}

export function EditSpan(props: EditSpanPropsType) {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [inputValue, setInputValue] = useState<string>('')

    const activatedEditMode = () => {
        setEditMode(true)
        setInputValue(props.title)
    }
    const activatedViewMode = () => {
        setEditMode(false)
        props.renameItem(inputValue);
    }
    const inputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.currentTarget.value)

    const inputOnKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            activatedViewMode();
        }
    }

    return (
        editMode ?
            <TextField
                color={'secondary'}
                variant={'outlined'}
                size={'small'}
                onKeyPress={inputOnKeyPressHandler}
                type="text"
                value={inputValue}
                onDoubleClick={activatedViewMode}
                onBlur={activatedViewMode}
                autoFocus
                onChange={inputOnChangeHandler} /> :
            <span
                onDoubleClick={activatedEditMode}>{props.title}</span>
    )
}