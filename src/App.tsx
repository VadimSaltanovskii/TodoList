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


  let whatToLearnId = v1()
  let whatYouWantId = v1()
  // Ассоциативный массив для общего стейта всех листов
  let [initialTasks, setTasks] = useState({
    [whatToLearnId]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: true },
      { id: v1(), title: 'Angular', isDone: false },
    ],
    [whatYouWantId]: [
      { id: v1(), title: 'Macbook', isDone: false },
      { id: v1(), title: 'BMW 5', isDone: false },
      { id: v1(), title: 'House', isDone: false },
      { id: v1(), title: 'Son', isDone: false },
      { id: v1(), title: 'Iphone', isDone: false },
    ],
  })
  let [todoLists, setTodoLists] = useState<TodoListsType>([
    { id: whatToLearnId, title: 'What to learn', filter: 'All' },
    { id: whatYouWantId, title: 'What you want', filter: 'Active' }
  ])

  function removeTask(id: string, todoListId: string) {
    // debugger
    let currentTodoList = initialTasks[todoListId]
    let filteredTasks = currentTodoList.filter(oneTask => oneTask.id !== id)
    initialTasks[todoListId] = filteredTasks
    setTasks({ ...initialTasks })
  }

  function addTask(title: string, todoListId: string) {
    let newTask: OneTaskPropsType = {
      id: v1(),
      title: title,
      isDone: false
    }
    let currentTodoList = initialTasks[todoListId]
    let updatedTodoList = [...currentTodoList, newTask]
    initialTasks[todoListId] = updatedTodoList
    setTasks({ ...initialTasks })
  }

  function changeFilter(newValue: FilterValuesType, todoListId: string) {
    let currentTodoList = todoLists.find((oneTodoList) => oneTodoList.id === todoListId)
    if (currentTodoList) {
      currentTodoList.filter = newValue
    }
    setTodoLists([...todoLists])
  }

  // Кликабельность чекбокса
  function changeIsDone(id: string, newIsDone: boolean, todoListId: string) {
    let tasks = initialTasks[todoListId]
    let requiredTask = tasks.find((oneTask) => oneTask.id === id)
    if (requiredTask) {
      requiredTask.isDone = newIsDone
      setTasks({ ...initialTasks })
    }
  }

  // удаление todoList
  function removeTodoList(todoListId: string) {
    let filteredTodoList = todoLists.filter((oneTodoList) => oneTodoList.id !== todoListId)
    setTodoLists(filteredTodoList)
    delete initialTasks[todoListId]
    setTasks({...initialTasks})
  }

  return (
    <div className="App">
      {
        todoLists.map((oneTodoList) => {
          // Фильтрация 
          let finalInitialTasks = initialTasks[oneTodoList.id]

          if (oneTodoList.filter === 'Completed') {
            finalInitialTasks = initialTasks[oneTodoList.id].filter((oneTask) => oneTask.isDone === true)
          }

          if (oneTodoList.filter === 'Active') {
            finalInitialTasks = initialTasks[oneTodoList.id].filter((oneTask) => oneTask.isDone === false)
          }

          return (
            <TodoList
              key={oneTodoList.id}
              id={oneTodoList.id}
              title={oneTodoList.title}
              tasks={finalInitialTasks}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeIsDone={changeIsDone}
              filter={oneTodoList.filter}
              removeTodoList={removeTodoList}
            />)
        })
      }
    </div>
  );
}

export default App;
