import { v1 } from "uuid";
import { TodoListType, FilterType, RatingType } from "../App";


export type DeleteTodoListActionType = {
    type: 'Delete Todo List'
    id: string
}

export type AddTodoListActionType = {
    type: 'Add Todo List'
    newId: string
    newTitle: string
}

type ChangeTitleTodoListActionType = {
    type: 'Change title'
    id: string
    changeTitle: string
}

type ChangeFilterTodoListActionType = {
    type: 'Change filter'
    id: string
    newFilter: FilterType
}

type ChangeRatingTodoListActionType = {
    type: 'Change rating'
    id: string
    newRating: RatingType
}

export type ActionTypes = DeleteTodoListActionType | AddTodoListActionType | ChangeTitleTodoListActionType | ChangeFilterTodoListActionType | ChangeRatingTodoListActionType

export function todoListsReducer(state: Array<TodoListType>, action: ActionTypes): Array<TodoListType> {
    switch (action.type) {
        case 'Delete Todo List':
            return state.filter((oneTodoList) => oneTodoList.id !== action.id);
        case 'Add Todo List':
            let newTodoList: TodoListType = {
                id: action.newId,
                title: action.newTitle,
                filter: 'all',
                rating: 0,
            }
            return [...state, newTodoList]
        case 'Change title':
            let currentTodoList = state.find((oneTodoList) => oneTodoList.id === action.id)
            if (currentTodoList) {
                currentTodoList.title = action.changeTitle
            }
            return [...state]
        case 'Change filter':
            let todoList = state.find((oneTodoList) => oneTodoList.id === action.id)
            if (todoList) {
                todoList.filter = action.newFilter
            }
            return [...state];
        case "Change rating":
            let todoListWithRating = state.find((oneTodoList) => oneTodoList.id === action.id)
            if (todoListWithRating) {
                todoListWithRating.rating = action.newRating
            }
            return [...state];
        default:
            throw new Error('Action not found')
    }
}

export function DeleteTodoListAC (idAC: string): DeleteTodoListActionType {
    return {type: 'Delete Todo List', id: idAC}
}

export function AddTodoListAC (titleAC: string): AddTodoListActionType {
    return {type: 'Add Todo List', newId: v1(), newTitle: titleAC}
}

export function ChangeTitleTodoListAC (idAC: string, titleAC: string): ChangeTitleTodoListActionType {
    return {type: 'Change title', id: idAC, changeTitle: titleAC}
}

export function ChangeFilterTodoListAC (idAC: string, filterAC: FilterType): ChangeFilterTodoListActionType {
    return {type: 'Change filter', id: idAC, newFilter: filterAC}
}

export function ChangeRatingTodoListAC (idAC: string, ratingAC: RatingType): ChangeRatingTodoListActionType {
    return {type: 'Change rating', id: idAC, newRating: ratingAC}
}