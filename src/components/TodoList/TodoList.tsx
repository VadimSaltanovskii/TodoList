import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import { Rating } from '../Rating/Rating'
import { RatingPropsType } from '../Rating/Rating'
import { filterForAllTasksType, RatingType } from '../../App'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditSpan } from '../EditSpan/EditSpan'

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
    changeTaskTitle: (id: string, newTitle: string, todoListid: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export function TodoList(props: TodoListPropsType) {

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

    function addItem(title: string) {
        props.addOneTask(title, props.id)
    }

    function changeTodoListTitle (newTitle: string) {
        props.changeTodoListTitle(props.id, newTitle)
    }

    return (
        <div className={'todoList'}>
            <i><h3><EditSpan title={props.title} onChange={changeTodoListTitle}/> <button onClick={onDeleteListClickHandler}>Удалить лист</button></h3></i>
            <AddItemForm
                addItem={addItem}
            />
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

                        function onChangeTitleHandler(newValue: string) {
                            props.changeTaskTitle(oneTask.id, newValue, props.id)


                        }

                        return <li key={oneTask.id} className={oneTask.isDone ? 'is-done' : ''}>
                            {/* <span>ID: {oneTask.id}</span> */}
                            <input
                                type={'checkbox'}
                                checked={oneTask.isDone}
                                onChange={changeIsDoneHandler}
                            />
                            {/* <span><b>{oneTask.taskTitle} </b></span> */}
                            <EditSpan title={oneTask.taskTitle} onChange={onChangeTitleHandler} />
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

