import { Button, TextField } from '@material-ui/core'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import AddTodoListStyles from './AddTodoList.module.css'
import SaveIcon from '@material-ui/icons/Save';

export type AddItemFormProps = {
    addItem: (newTitle: string) => void
}

export function AddItemForm(props: AddItemFormProps) {

    let [inputValue, setInputValue] = useState<string>('')
    let [error, setError] = useState<string | boolean>(false)

    const inputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setInputValue(event.currentTarget.value)
    }

    const addButtonHandler = () => {
        if (inputValue.trim() !== '') {
            props.addItem(inputValue)
            setInputValue('')
        } else {
            setError('Title is required')
        }
    }

    const inputOnKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addButtonHandler()
        }
    }

    return (
        <div className={AddTodoListStyles.main}>
            <TextField
                id="outlined-basic"
                label="Please enter new title"
                variant="outlined"
                type="text"
                color={'secondary'}
                size={'small'}
                value={inputValue}
                onChange={inputOnChangeHandler}
                onKeyPress={inputOnKeyPressHandler}
                className={error ? AddTodoListStyles.error : ''}
                helperText={error? 'Title is required' : ''}
            />
            <Button
                variant={'contained'}
                onClick={addButtonHandler}
                color={'secondary'}
                size={'small'}
                startIcon={<SaveIcon />}
            >Add</Button>
            {/* {error && <div className={AddTodoListStyles.errorMessage}>{error}</div>} */}
        </div>
    )

}