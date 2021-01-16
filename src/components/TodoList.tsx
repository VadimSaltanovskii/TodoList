import React from 'react'

export type ListType = {
    number: number
    name: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    list: Array<ListType>
    removeTask: Function

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
                {
                    props.list.map((element) => {
                        debugger
                        return <li>
                            <span>ID: {element.number}</span>
                            <input type={'checkbox'} checked={element.isDone} />
                            <span>{element.name}</span>
                            <button onClick={() => {
                                props.removeTask(element.number)
                            }}>Delete</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Complite</button>
            </div>
        </div>
    )
}