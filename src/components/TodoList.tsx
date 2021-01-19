import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValuesType } from '../App'

export type ListType = {
    number: string
    name: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    list: Array<ListType>
    removeTask: (number: string) => void
    filteredTask: (value: FilterValuesType) => void
    addTask: (value: string) => void

}

export function TodoList(props: TodoListPropsType) {

    let [inputValue, setInputValue] = useState('')

    // const onChangeHandler = () => {
    //     (event) => { setInputValue(event.currentTarget.value) }
    // }

    // const onKeyPressHendler = () => {
    //     (event: KeyboardEvent<HTMLInputElement>) => {
    //         if (event.key === 'Enter') {
    //             props.addTask(inputValue)
    //             setInputValue('')
    //         }
    //     }
    // }

    // const addTaskHandler = () => {
    //     props.addTask(inputValue)
    //     setInputValue('')
    // }

    const onAllClickHandler = () => props.filteredTask('All')
    const onActiveClickHandler = () => props.filteredTask('Active')
    const onCompletedClickHandler = () => props.filteredTask('Completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    type={"text"}
                    value={inputValue}
                    onChange={(event) => { setInputValue(event.currentTarget.value) }}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            props.addTask(inputValue)
                            setInputValue('')
                        }
                    }
                    } />

                <button onClick={() => {
                    props.addTask(inputValue)
                    setInputValue('')
                }}>Add new</button>
            </div>
            <ul>
                {
                    props.list.map((element) => {
                        // key обязательный атрибут для привязки конкретного элемента
                        return <li key={element.number}>
                            <span>ID: {element.number}</span>
                            <input type={'checkbox'} checked={element.isDone} />
                            <span>{element.name}</span>
                            <button onClick={() => { props.removeTask(element.number) }}>Delete</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}