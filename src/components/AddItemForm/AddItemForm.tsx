import { ChangeEvent, useState, KeyboardEvent } from "react"
import React from 'react'

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [titleNewTask, setTitleNewTask] = useState('')
    let [error, setError] = useState<string>('')
    function inputOnChange(event: ChangeEvent<HTMLInputElement>) {
        setTitleNewTask(event.currentTarget.value)
    }
    function inputKeyPress(event: KeyboardEvent<HTMLInputElement>) {
        setError('')
        if (event.key === 'Enter' && titleNewTask.trim() !== '') {
            props.addItem(titleNewTask.trim())
            setTitleNewTask('')
        }
        if (event.key === 'Enter' && titleNewTask.trim() === '') {
            setError('Поле обязательно')
        }
        else {
            return
        }
    }
    function addTaskButtonHandler() {
        if (titleNewTask.trim() !== '') {
            props.addItem(titleNewTask.trim())
            setTitleNewTask('')
        }
        else {
            setError('Поле обязательно')
            return
        }
    }
    return (
        <div>
            <input
                type="text"
                value={titleNewTask}
                onChange={inputOnChange}
                onKeyPress={inputKeyPress}
                className={error ? 'error' : ''} />
            <button onClick={addTaskButtonHandler}>Добавить</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}