import { InitialStateType, TodoListType } from "../App"
import { tasksReducer } from "./tasks-reducer"
import { AddTodoListAC, todoListsReducer } from './todolists-reducer'

test('id in todoLists must be equal tasks id', () => {
    const startTasksState: InitialStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = AddTodoListAC('Money for')
    const finalTasksState = tasksReducer(startTasksState, action)
    const finalTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(finalTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = finalTodoListsState[finalTodoListsState.length - 1].id

    expect(idFromTasks).toBe(action.newId)
    expect(idFromTodoLists).toBe(action.newId)
})