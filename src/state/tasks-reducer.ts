import { v1 } from "uuid";
import { InitialStateType, OneTask, RatingType, } from "../App";
import { AddTodoListActionType, DeleteTodoListActionType } from './todolists-reducer'

type DeleteTaskActionType = {
    type: 'Delete'
    todoListId: string
    taskId: string
}

type AddTaskActionType = {
    type: 'Add'
    todoListId: string
    title: string
}

type ChangeStatusTaskActionType = {
    type: 'Change status'
    todoListId: string
    taskId: string
}

type ChangeTitleTaskActionType = {
    type: 'Change title'
    todoListId: string
    taskId: string
    newTitle: string
}

type ChangeRatingTaskActionType = {
    type: 'Change rating'
    todoListId: string
    taskId: string
    newRating: RatingType
}

type ActionTaskTypes = DeleteTaskActionType | AddTaskActionType | ChangeStatusTaskActionType | ChangeTitleTaskActionType | ChangeRatingTaskActionType | AddTodoListActionType | DeleteTodoListActionType

export function tasksReducer(state: InitialStateType, action: ActionTaskTypes): InitialStateType {
    switch (action.type) {
        case 'Delete': {
            let copyState = { ...state }
            let currentListForDel = copyState[action.todoListId]
            copyState[action.todoListId] = currentListForDel.filter((oneTask) => oneTask.id !== action.taskId)
            return { ...copyState }
        }
        case 'Add': {
            let copyState = { ...state }
            let currentListForAdd = copyState[action.todoListId]
            if (currentListForAdd.find((oneTask) => oneTask.title === action.title) === undefined) {
                let newTask: OneTask = { id: v1(), title: action.title, isDone: false, difficult: 0 }
                copyState[action.todoListId] = [...currentListForAdd, newTask]
            } else {
                alert('Title is exists')
            }
            return { ...copyState }
        }
        case 'Change status': {
            let copyState = { ...state }
            let currentListForChange = copyState[action.todoListId]
            let currentTask = currentListForChange.find((oneTask) => oneTask.id === action.taskId)
            if (currentTask) {
                currentTask.isDone = !currentTask.isDone
            } else {
                alert('Tasks not found')
            }
            return { ...copyState }
        }
        case 'Change title': {
            let copyState = { ...state }
            let currentTaskForChangeTitle = copyState[action.todoListId].find((oneTask) => oneTask.id === action.taskId)
            if (currentTaskForChangeTitle) {
                currentTaskForChangeTitle.title = action.newTitle
            }
            return { ...copyState }
        }
        case 'Change rating': {
            let copyState = { ...state }
            let currentTaskForChangeRating = copyState[action.todoListId].find((oneTask) => oneTask.id === action.taskId)
            if (currentTaskForChangeRating) {
                currentTaskForChangeRating.difficult = action.newRating
            }
            return { ...copyState }
        }
        case 'Add Todo List': {
            let stateCopy = { ...state }
            stateCopy[action.newId] = []
            return stateCopy
        }
        case 'Delete Todo List': {
            let stateCopy = { ...state }
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return { ...state };
    }
}

export function deleteTaskAC(todoListId: string, taskId: string): DeleteTaskActionType {
    return { type: 'Delete', todoListId: todoListId, taskId: taskId }
}

export function addTaskAC(todoListId: string, title: string): AddTaskActionType {
    return { type: 'Add', todoListId: todoListId, title: title }
}

export function changeTitleTaskAC(todoListId: string, taskId: string, newTitle: string): ChangeTitleTaskActionType {
    return { type: 'Change title', todoListId: todoListId, taskId: taskId, newTitle: newTitle }
}

export function changeStatusTaskAC(todoListId: string, taskId: string): ChangeStatusTaskActionType {
    return { type: 'Change status', todoListId: todoListId, taskId: taskId }
}

export function changeRatingTaskAC(todoListId: string, taskId: string, newRating: RatingType): ChangeRatingTaskActionType {
    return { type: 'Change rating', todoListId: todoListId, taskId: taskId, newRating: newRating }
}