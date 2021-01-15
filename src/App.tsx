import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList'
import { ListType } from './components/TodoList'

export function App() {
    let list1: Array<ListType> = [
        { number: 1, name: 'HTML', isDone: true },
        { number: 2, name: 'CSS', isDone: false },
        { number: 3, name: 'JS', isDone: true },
        // {number: 4, name: 'TypeScript', isDone: false},
    ]

    let list2: Array<ListType> = [
        { number: 1, name: 'Films', isDone: true },
        { number: 2, name: 'Cartoons', isDone: true },
        { number: 3, name: 'XXX', isDone: true },
    ]

    let list3: Array<ListType> = [
        { number: 1, name: 'Bread', isDone: false },
        { number: 2, name: 'Ham', isDone: true },
        { number: 3, name: 'Meat', isDone: true },
        // {number: 4, name: 'Vegetables', isDone: true},
        // {number: 5, name: 'Milk', isDone: true},
    ]

    let list4: Array<ListType> = [
        { number: 1, name: 'Moscow', isDone: true },
        { number: 2, name: 'Tokio', isDone: false },
        { number: 3, name: 'Asgard', isDone: false },
        // {number: 4, name: 'USA', isDone: false},
        // {number: 5, name: 'Canada', isDone: false},
        // {number: 6, name: 'France', isDone: false},
        // {number: 7, name: 'Italy', isDone: false},
    ]

    return (
        <div className={'App'}>
            <TodoList title={'What to learn'} list={list1} />
            <TodoList title={'What to watch'} list={list2} />
            <TodoList title={'What to eat'} list={list3} />
            <TodoList title={'Where to go '} list={list4} />
        </div>
    )
}
