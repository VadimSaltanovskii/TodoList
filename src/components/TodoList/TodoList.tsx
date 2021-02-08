import React, { useState } from 'react'
import TodoListStyle from './TodoList.module.css'
import { Rating } from '../Rating/Rating'
import { FilterValuesType } from '../../App'

export type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<OneTaskPropsType>
    removeTask: (id: string) => void
    changeFilter: (todoListId: string, newValue: FilterValuesType) => void
    addTask: (title: string) => void
    changeIsDone: (id: string, newIsDone: boolean) => void
    filter: FilterValuesType
}

export type OneTaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: TodoListPropsType) {

    let [inputText, setInputText] = useState('')

    let [error, setError] = useState<string | boolean>(false)

    const inputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.currentTarget.value)
    }

    const inputOnKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (event.key === 'Enter' && inputText.trim() !== '') {
            props.addTask(inputText)
            setInputText('')
        } else {
            // setError('Title is required')
        }
    }

    const addButtonOnClickHandler = () => {
        if (inputText.trim() === '') {
            setError('Title is required')
        } else {
            props.addTask(inputText.trim())
            setInputText('')
        }
    }

    const allButtonOnClickHandler = () => {
        props.changeFilter(props.id, 'All')
    }
    const activeButtonOnClickHandler = () => {
        props.changeFilter(props.id, 'Active')
    }
    const completedButtonOnClickHandler = () => {
        props.changeFilter(props.id, 'Completed')
    }

    return (
        <div className={TodoListStyle.oneListBlock}>
            <i><h3>{props.title}</h3></i>
            <div>
                <input
                    value={inputText}
                    placeholder={'Enter new task'}
                    onChange={inputOnChangeHandler}
                    onKeyPress={inputOnKeyPressHandler}
                    className={error ? 'error' : ''} />
                <button onClick={addButtonOnClickHandler}>Add</button>
                {error && <div className={'error-message'}>{error}</div>}

            </div>
            <ol>
                {props.tasks.map((oneTask) => {

                    // Генерируется много функций в map
                    const removeButtonOnClickHandler = () => {
                        props.removeTask(oneTask.id)
                    }

                    const checkboxOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                        props.changeIsDone(oneTask.id, event.currentTarget.checked)
                    }

                    return (
                        <li key={oneTask.id} className={oneTask.isDone ? 'isDone' : ''}>
                            <input
                                type={'checkbox'}
                                checked={oneTask.isDone}
                                onChange={checkboxOnChangeHandler}
                            />
                            <span>id:{oneTask.id} </span>
                            <span><b>{oneTask.title} </b></span>
                            <button onClick={removeButtonOnClickHandler}>Delete</button>
                        </li>
                    )
                })}
            </ol>
            <div className={TodoListStyle.filtration}>
                <h4>Filtration</h4>
                <button className={props.filter === 'All' ? 'active-filter' : ''} onClick={allButtonOnClickHandler}>All</button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''} onClick={activeButtonOnClickHandler}>Active</button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''} onClick={completedButtonOnClickHandler}>Completed</button>
            </div>
            <h4>Difficult rating</h4>
            <Rating countStars={4} />
        </div>
    )
}