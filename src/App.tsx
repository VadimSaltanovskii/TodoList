import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { OneTaskPropsType, TodoList, TodoListPropsType } from './components/TodoList/TodoList';
import { v1 } from 'uuid';

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type OneTodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TodoListsType = Array<OneTodoListType>


function App() {

  // Стейт для удаления Заданий
  let [stateLearnTasks, setTasks] = useState<Array<OneTaskPropsType>>([
    { id: String(Math.floor(Math.random() * 100)), title: 'HTML', isDone: true },
    { id: String(Math.floor(Math.random() * 100)), title: 'JS', isDone: true },
    { id: String(Math.floor(Math.random() * 100)), title: 'CSS', isDone: true },
    { id: String(Math.floor(Math.random() * 100)), title: 'React', isDone: false },
    { id: String(Math.floor(Math.random() * 100)), title: 'Redux', isDone: true },
    { id: String(Math.floor(Math.random() * 100)), title: 'Angular', isDone: false },
  ])

  // Стейт для фильтрации заданий
  // let [stateFilter, setFilter] = useState<FilterValuesType>('All') //стал ненужен

  function removeTask(id: string) {
    setTasks(stateLearnTasks.filter(oneTask => oneTask.id !== id))
  }

  function addTask(title: string) {
    let newTask: OneTaskPropsType = {
      id: v1(),
      title: title,
      isDone: false
    }
    setTasks([...stateLearnTasks, newTask])
  }

  function changeFilter(todoListId: string, newValue: FilterValuesType) {
    let todoList = todoLists.find((oneTodoList) => oneTodoList.id === todoListId)
    todoList ? todoList.filter = newValue : alert('TodoList not found')
    setTodoLists([...todoLists])
  }

  // Кликабельность чекбокса
  function changeIsDone(id: string, newIsDone: boolean) {
    let requiredTask = stateLearnTasks.find((oneTask) => oneTask.id === id)
    requiredTask ? requiredTask.isDone = newIsDone : alert('Cant find')
    setTasks([...stateLearnTasks])
  }

  // Урок 6, несколько TodoLists
  let [todoLists, setTodoLists] = useState<TodoListsType>([
    { id: v1(), title: 'What to learn', filter: 'Completed' },
    { id: v1(), title: 'What to buy', filter: 'All' },
    { id: v1(), title: 'What to eat', filter: 'All' },
    { id: v1(), title: 'What you want', filter: 'Active' },
  ])

  return (
    <div className="App">
      {
        todoLists.map((oneTodoList) => {
          // Фильтрация 
          let finalStateLearnTasks = stateLearnTasks

          if (oneTodoList.filter === 'Completed') {
            finalStateLearnTasks = stateLearnTasks.filter(oneTask => oneTask.isDone === true)
          }

          if (oneTodoList.filter === 'Active') {
            finalStateLearnTasks = stateLearnTasks.filter(oneTask => oneTask.isDone === false)
          }

          return (
            <TodoList
              key={oneTodoList.id}
              id={oneTodoList.id}
              title={oneTodoList.title}
              tasks={finalStateLearnTasks}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeIsDone={changeIsDone}
              filter={oneTodoList.filter}
            />)
        })
      }
    </div>
  );
}

export default App;
