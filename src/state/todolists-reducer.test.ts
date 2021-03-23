import { useState } from "react"
import { v1 } from "uuid"
import { AddTodoListAC, ChangeFilterTodoListAC, ChangeRatingTodoListAC, ChangeTitleTodoListAC, DeleteTodoListAC, todoListsReducer } from "./todolists-reducer"
import { TodoListType } from '../App'


let startState: Array<TodoListType>
let todoListId1: string
let todoListId2: string

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()

    startState = [
        { id: todoListId1, title: 'What to learn', filter: 'all', rating: 4 },
        { id: todoListId2, title: 'What to buy', filter: 'all', rating: 3 },
    ]
})

test('correct todoList should be delete', () => {
    const finalState = todoListsReducer(startState, DeleteTodoListAC(todoListId1))

    expect(finalState.length).toBe(1)
    expect(finalState[0].id).toBe(todoListId2)
    expect(finalState[0].rating).toBe(startState[1].rating)
})

test('correct todoList should be added', () => {
    const finalState = todoListsReducer(startState, AddTodoListAC('What to eat'))

    expect(finalState.length).toBe(3)
    expect(finalState[2].title).toBe('What to eat')
    expect(finalState[2].filter).toBe('all')
    expect(finalState[2].rating).toBe(0)
})

test('correct change todoList title', () => {
    const finalState = todoListsReducer(startState, ChangeTitleTodoListAC(todoListId2, 'Beliberda'))

    expect(finalState.length).toBe(2)
    expect(finalState[1].title).toBe('Beliberda')
    expect(finalState[1].title.length).toBe(9)
    expect(finalState[0].title).toBe('What to learn')
})

test('correct filter must be apply', () => {
    const finalState = todoListsReducer(startState, ChangeFilterTodoListAC(todoListId1, 'completed'))
    // const result = startState[0].filter === finalState[0].filter
    expect(finalState[0].filter).toBe('completed')
    expect(finalState[0].filter).not.toBe('all')
    expect(finalState[1].filter).toBe(startState[1].filter)

})

test('correct change rating', () => {
    const finalState = todoListsReducer(startState, ChangeRatingTodoListAC(todoListId2, 5))

    expect(finalState[0].rating).toBe(startState[0].rating)
    expect(finalState[1].rating).not.toBe(3)
    expect(finalState[1].rating).toBe(5);
})