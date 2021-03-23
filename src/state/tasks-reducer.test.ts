import { v1 } from "uuid";
import { InitialStateType, OneTask } from "../App";
import { addTaskAC, deleteTaskAC, tasksReducer, changeTitleTaskAC, changeStatusTaskAC, changeRatingTaskAC } from "./tasks-reducer";
import { AddTodoListAC, DeleteTodoListAC } from "./todolists-reducer";

let startState: InitialStateType
let todoListId1: string
let todoListId2: string

beforeEach(() => {

    todoListId1 = v1()
    todoListId2 = v1()

    startState = {
        [todoListId1]: [
            { id: v1(), title: 'HTML', isDone: true, difficult: 2 },
            { id: v1(), title: 'CSS', isDone: true, difficult: 2 },
            { id: 'reactID', title: 'REACT', isDone: false, difficult: 5 },
            { id: v1(), title: 'REDUX', isDone: false, difficult: 5 },
            { id: v1(), title: 'VUE', isDone: false, difficult: 5 },
        ],
        [todoListId2]: [
            { id: v1(), title: 'Bread', isDone: true, difficult: 1 },
            { id: v1(), title: 'Milk', isDone: true, difficult: 1 },
            { id: v1(), title: 'Ham', isDone: true, difficult: 1 },
            { id: 'tomatID', title: 'Tomato', isDone: true, difficult: 1 },
            { id: v1(), title: 'Cheese', isDone: true, difficult: 1 },
        ],
    }
})

test('add task must be correct', () => {

    const finalState: InitialStateType = tasksReducer(startState, addTaskAC(todoListId1, 'JavaScript'))

    expect(finalState[todoListId1].length).toBe(6)
    expect(finalState[todoListId1][5].title).toBe('JavaScript')
    expect(finalState[todoListId1][5].id).toBeDefined()
})

test('delete task must be correct', () => {

    const finalState: InitialStateType = tasksReducer(startState, deleteTaskAC(todoListId2, 'tomatID'))

    expect(finalState[todoListId2].length).toBe(4)
    expect(finalState[todoListId2].every((oneTask) => oneTask.id != 'tomatID')).toBeTruthy()
})

test('change title task must be correct', () => {
    const finalState: InitialStateType = tasksReducer(startState, changeTitleTaskAC(todoListId2, 'tomatID', 'Pomidor'))

    expect(finalState[todoListId2].find((oneTask) => oneTask.title === 'Pomidor')).toBeTruthy()
    expect(finalState[todoListId2][3].title).toBe('Pomidor')
})

test('change status task must be correct', () => {
    const finalState: InitialStateType = tasksReducer(startState, changeStatusTaskAC(todoListId1, 'reactID'))

    expect(finalState[todoListId1].find((oneTask) => oneTask.id === 'reactID')?.isDone).toBe(true)
    expect(finalState[todoListId1].find((oneTask) => oneTask.id === 'reactID')?.isDone).toBeTruthy()

})

test('change rating task must be correct', () => {

    const finalState: InitialStateType = tasksReducer(startState, changeRatingTaskAC(todoListId2, 'tomatID', 5))

    expect(finalState[todoListId2][3].difficult).toBe(5)
    expect(finalState[todoListId2][2].difficult).toBe(1)
    expect(finalState[todoListId2][4].difficult).toBe(1)
})

test('add todo list must contained new array of tasks', () => {
    const finalState = tasksReducer(startState, AddTodoListAC('Lessons'))

    const keys = Object.keys(finalState)
    const newKey = keys.find(keys => keys != todoListId1 && keys != todoListId2)

    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(finalState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const finalState = tasksReducer(startState, DeleteTodoListAC(todoListId1))

    const keys = Object.keys(finalState);

    expect(keys.length).toBe(1);
    expect(finalState[todoListId1]).not.toBeDefined();
})
