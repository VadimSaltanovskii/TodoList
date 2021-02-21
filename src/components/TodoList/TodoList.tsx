import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import { Rating } from '../Rating/Rating'
import { RatingPropsType } from '../Rating/Rating'
import { filterForAllTasksType, RatingType } from '../../App'

export type OneTaskType = {
    id: string
    taskTitle: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<OneTaskType>
    rating: RatingType
    deleteOneTask: (idTask: string, idTodoList: string) => void
    changeFilter: (value: filterForAllTasksType, todoListId: string) => void
    addOneTask: (title: string, idTodoList: string) => void
    changeIsDone: (idTask: string, newStatus: boolean, idTodoList: string) => void
    filter: filterForAllTasksType
    deleteTodoList: (idTodoList: string) => void
}

export function TodoList(props: TodoListPropsType) {

    let [titleNewTask, setTitleNewTask] = useState('')
    let [error, setError] = useState<string>('')

    //1
    function inputOnChange(event: ChangeEvent<HTMLInputElement>) {
        setTitleNewTask(event.currentTarget.value)
    }
    //2
    function inputKeyPress(event: KeyboardEvent<HTMLInputElement>) {
        setError('')
        if (event.key === 'Enter' && titleNewTask.trim() !== '') {
            props.addOneTask(titleNewTask.trim(), props.id)
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
            props.addOneTask(titleNewTask.trim(), props.id)
            setTitleNewTask('')
        }
        else {
            setError('Поле обязательно')
            return
        }
    }
    //4
    function onAllClickHandler() {
        props.changeFilter('all', props.id)
    }
    function onActiveClickHandler() {
        props.changeFilter('active', props.id)
    }
    function onCompletedClickHandler() {
        props.changeFilter('completed', props.id)
    }

    function onDeleteListClickHandler() {
        props.deleteTodoList(props.id)
    }

    return (
        <div className={'todoList'}>
            <i><h3>{props.title} <button onClick={onDeleteListClickHandler}>Удалить лист</button></h3></i>
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
            <ul>
                {
                    props.tasks.map((oneTask) => {
                        //3 создается в мапе много функций
                        function deleteOnClickHandler() {
                            props.deleteOneTask(oneTask.id, props.id)
                        }
                        function changeIsDoneHandler(event: ChangeEvent<HTMLInputElement>) {
                            props.changeIsDone(oneTask.id, event.currentTarget.checked, props.id)
                        }

                        return <li key={oneTask.id} className={oneTask.isDone ? 'is-done' : ''}>
                            {/* <span>ID: {oneTask.id}</span> */}
                            <input
                                type={'checkbox'}
                                checked={oneTask.isDone}
                                onChange={changeIsDoneHandler}
                            />
                            <span><b>{oneTask.taskTitle}</b> </span>
                            <button onClick={deleteOnClickHandler}>Удалить</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>Все</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Активные</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Выполненные</button>
            </div>
            <div>
                <br></br>
                <span><i><b>Сложность списка: </b></i></span>
                <span><Rating countStars={props.rating} /></span>
            </div>
        </div>
    )
}
