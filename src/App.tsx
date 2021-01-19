import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList'
import { ListType } from './components/TodoList'
import { v1 } from 'uuid';

export type FilterValuesType = 'All' | 'Completed' | 'Active'

export function App() {

    // BLL DATA
    let initlist1: Array<ListType> = [
        { number: v1(), name: 'HTML', isDone: true },
        { number: v1(), name: 'CSS', isDone: false },
        { number: v1(), name: 'JS', isDone: true },
        { number: v1(), name: 'Angular', isDone: false },
        { number: v1(), name: 'Vue', isDone: false },
        { number: v1(), name: 'Event Loop', isDone: true },
        { number: v1(), name: 'Web API', isDone: true },
    ]

    //стейт для списка и фильтрации
    let [filter, setFilter] = useState<FilterValuesType>('All')
    let [list1, setLists1] = useState(initlist1)

    // функция удаления записи
    function removeTask1(number: string) {
        let filteredList1 = list1.filter(element => element.number !== number)
        setLists1(filteredList1)
    }

    // функция добавления записи
    function addTask1(value: string) {
        let newTask: ListType = {
            number: v1(),
            name: value,
            isDone: false,
        }
        setLists1([...list1, newTask])
    }

    // функция фильтрации записей
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let listForTodo = list1
    if (filter === 'Completed') {
        listForTodo = list1.filter(task => task.isDone === true)
    }
    if (filter === 'Active') {
        listForTodo = list1.filter(task => task.isDone === false)
    }

    return (
        <div className={'App'}>
            <TodoList
                title={'What to learn'}
                list={listForTodo}
                removeTask={removeTask1}
                filteredTask={changeFilter}
                addTask={addTask1} />
        </div>
    )
}
