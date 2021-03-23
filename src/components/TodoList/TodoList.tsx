import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import TodoListStyles from './TodoList.module.css'
import { FilterType, OneTask, RatingType } from '../../App'
import { Rating } from '../Rating/Rating';
import { AddItemForm } from '../AddTodoList/AddItemForm';
import { EditSpan } from '../EditSpan/EditSpan';
import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

type TodoListProps = {
    id: string
    title: string
    tasks: Array<OneTask>
    deleteOneTask: (idTask: string, idTodoList: string) => void
    changeFilter: (newFilter: FilterType, idTodoList: string) => void
    addOneTask: (newTitle: string, idTodoList: string) => void
    changeIsDone: (idTask: string, idTodoList: string) => void
    filter: FilterType
    rating: RatingType
    deleteTodoList: (idTodoList: string) => void
    changeTaskTitle: (newTitle: string, idTodoList: string, idTask: string) => void
    changeTodoListTitle: (newTitle: string, idTodoList: string) => void
}

export function TodoList(props: TodoListProps) {

    // Рефакторинг функций

    const buttonAllClickHandler = () => props.changeFilter('all', props.id)
    const buttonActiveClickHandler = () => props.changeFilter('active', props.id)
    const buttonCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const deleteListButtonHandler = () => props.deleteTodoList(props.id)
    const addOneTask = (title: string) => props.addOneTask(title, props.id)
    const onChangeTodoListTitleHandler = (newTitle: string) => props.changeTodoListTitle(newTitle, props.id)

    return (
        <div className={TodoListStyles.main}>
            <i><h3><EditSpan title={props.title} renameItem={onChangeTodoListTitleHandler} />
                <IconButton aria-label="delete" onClick={deleteListButtonHandler} color={'secondary'}>
                    <Delete />
                </IconButton>
            </h3></i>
            <AddItemForm
                addItem={addOneTask} />
            <ul>
                {
                    props.tasks.map((oneTask) => {
                        const deleteButtonHandler = () => props.deleteOneTask(oneTask.id, props.id)
                        const checkboxChangeHandler = () => props.changeIsDone(oneTask.id, props.id)
                        const onChangeHandler = (newTitle: string) => props.changeTaskTitle(newTitle, props.id, oneTask.id)
                        return (
                            <li
                                key={oneTask.id}
                                className={oneTask.isDone ? TodoListStyles.isDone : ''}
                            >
                                <Checkbox
                                    checked={oneTask.isDone}
                                    onChange={checkboxChangeHandler}
                                    color={'secondary'} />
                                <EditSpan title={oneTask.title} renameItem={onChangeHandler} />
                                <Rating countOfStars={oneTask.difficult} />
                                <IconButton aria-label="delete" onClick={deleteButtonHandler} color={'secondary'}>
                                    <Delete />
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            <Button color={'secondary'} variant={props.filter === 'all'? 'contained': 'outlined'}
                onClick={buttonAllClickHandler}
            >All</Button>
            <Button color={'secondary'} variant={props.filter === 'active'? 'contained': 'outlined'}
                onClick={buttonActiveClickHandler}
                className={props.filter === 'active' ? TodoListStyles.isActive : ''}
            >Active</Button>
            <Button color={'secondary'} variant={props.filter === 'completed'? 'contained': 'outlined'}
                onClick={buttonCompletedClickHandler}
                className={props.filter === 'completed' ? TodoListStyles.isActive : ''}
            >Completed</Button>
            <div>
                <p>Difficult to done</p>
                <Rating countOfStars={props.rating} />
            </div>
        </div>
    )
}