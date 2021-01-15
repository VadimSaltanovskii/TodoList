import React from 'react'

export type ListType = {
    number: number
    name: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    list: Array<ListType>

}

export function TodoList(props: TodoListPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text" />
                <button>Add new</button>
            </div>
            <ul>
                <li><span>ID: {props.list[0].number}</span><input type={'checkbox'} checked={props.list[0].isDone} /><span>{props.list[0].name}</span></li>
                <li><span>ID: {props.list[1].number}</span><input type={'checkbox'} checked={props.list[1].isDone} /><span>{props.list[1].name}</span></li>
                <li><span>ID: {props.list[2].number}</span><input type={'checkbox'} checked={props.list[2].isDone} /><span>{props.list[2].name}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Complite</button>
            </div>
        </div>
    )
}