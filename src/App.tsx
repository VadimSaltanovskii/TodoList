import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList'
import { ListType } from './components/TodoList'

export function App() {

    let initlist1: Array<ListType> = [
        { number: 1, name: 'HTML', isDone: true },
        { number: 2, name: 'CSS', isDone: false },
        { number: 3, name: 'JS', isDone: true },
        { number: 4, name: 'TypeScript', isDone: false },
    ]

    let initlist2: Array<ListType> = [
        { number: 1, name: 'Films', isDone: true },
        { number: 2, name: 'Cartoons', isDone: true },
        { number: 3, name: 'XXX', isDone: true },
    ]

    let initlist3: Array<ListType> = [
        { number: 1, name: 'Bread', isDone: false },
        { number: 2, name: 'Ham', isDone: true },
        { number: 3, name: 'Meat', isDone: true },
        { number: 4, name: 'Vegetables', isDone: true },
        { number: 5, name: 'Milk', isDone: true },
    ]

    let initlist4: Array<ListType> = [
        { number: 1, name: 'Moscow', isDone: true },
        { number: 2, name: 'Tokio', isDone: false },
        { number: 3, name: 'Asgard', isDone: false },
        { number: 4, name: 'USA', isDone: false },
        { number: 5, name: 'Canada', isDone: false },
        { number: 6, name: 'France', isDone: false },
        { number: 7, name: 'Italy', isDone: false },
    ]

    let [list1, setLists1] = useState(initlist1)
    let [list2, setLists2] = useState(initlist2)
    let [list3, setLists3] = useState(initlist3)
    let [list4, setLists4] = useState(initlist4)

    function removeTask1(number: number) {
        let filteredList1 = list1.filter(element => element.number !== number)
        setLists1(filteredList1)
    }

    function removeTask2(number: number) {
        let filteredList2 = list2.filter(element => element.number !== number)
        setLists2(filteredList2)
    }

    function removeTask3(number: number) {
        let filteredList3 = list3.filter(element => element.number !== number)
        setLists3(filteredList3)
    }

    function removeTask4(number: number) {
        let filteredList4 = list4.filter(element => element.number !== number)
        setLists4(filteredList4)
    }

    return (
        <div className={'App'}>
            <TodoList
                title={'What to learn'}
                list={list1}
                removeTask={removeTask1} />
            <TodoList
                title={'What to watch'}
                list={list2}
                removeTask={removeTask2} />
            <TodoList
                title={'What to eat'}
                list={list3}
                removeTask={removeTask3} />
            <TodoList
                title={'Where to go '}
                list={list4}
                removeTask={removeTask4} />
        </div>
    )
}
