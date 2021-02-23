import React, { useState } from 'react'
import './App.css'
import { OneTaskType, TodoList } from './components/TodoList/TodoList'
import { v1 } from 'uuid'
import { AddItemForm } from './components/AddItemForm/AddItemForm'

export type filterForAllTasksType = 'all' | 'active' | 'completed'

export type RatingType = 0 | 1 | 2 | 3 | 4 | 5

export type TodoListType = {
  id: string
  title: string
  filter: filterForAllTasksType
  rating: RatingType
}

export type allTasksType = {
  [key: string]: Array<OneTaskType>
}

function App() {

  let [todoListId1, todoListId2, todoListId3] = [v1(), v1(), v1()]

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn', filter: 'all', rating: 4 },
    { id: todoListId2, title: 'What to buy', filter: 'all', rating: 3 },
    { id: todoListId3, title: 'What to do', filter: 'all', rating: 5 }
  ])

  let [allTasks, setAllTasks] = useState<allTasksType>(
    {
      [todoListId1]: [
        { id: v1(), taskTitle: 'React', isDone: false },
        { id: v1(), taskTitle: 'Redux', isDone: false },
        { id: v1(), taskTitle: 'HTML', isDone: true },
        { id: v1(), taskTitle: 'CSS', isDone: true },
        { id: v1(), taskTitle: 'JS', isDone: true },
      ],
      [todoListId2]: [
        { id: v1(), taskTitle: 'Milk', isDone: false },
        { id: v1(), taskTitle: 'Ham', isDone: false },
        { id: v1(), taskTitle: 'Meat', isDone: true },
        { id: v1(), taskTitle: 'Bread', isDone: true },
        { id: v1(), taskTitle: 'Butter', isDone: true },
        { id: v1(), taskTitle: 'MacBook Pro', isDone: true },
        { id: v1(), taskTitle: 'BMW', isDone: true },
      ],
      [todoListId3]: [
        { id: v1(), taskTitle: 'Job', isDone: false },
        { id: v1(), taskTitle: 'House', isDone: false },
        { id: v1(), taskTitle: 'Son', isDone: true },
        { id: v1(), taskTitle: 'Happy life', isDone: true },
        { id: v1(), taskTitle: 'Money', isDone: true },
      ],
    }
  )

  function deleteOneTask(idTask: string, idTodoList: string) {
    let allTasksWithoutDelete = allTasks[idTodoList].filter((oneTask) => {
      return oneTask.id !== idTask
    })
    allTasks[idTodoList] = allTasksWithoutDelete
    setAllTasks({ ...allTasks })
  }

  function addOneTask(title: string, idTodoList: string) {
    let newTask: OneTaskType = {
      id: v1(),
      taskTitle: title,
      isDone: false,
    }
    let currentTodoList = allTasks[idTodoList]
    let updateTasks = [...currentTodoList, newTask]
    allTasks[idTodoList] = updateTasks
    setAllTasks({ ...allTasks })
  }

  function changeIsDone(idTask: string, newStatus: boolean, idTodoList: string) {
    let currentTodoList = allTasks[idTodoList]
    let currentTask = currentTodoList.find((oneTask) => oneTask.id === idTask)
    if (currentTask) {
      currentTask.isDone = newStatus;
      // allTasks[idTodoList] = [...currentTodoList]
      setAllTasks({ ...allTasks })
    }
  }

  function changeTaskTitle(idTask: string, newTitle: string, idTodoList: string) {
    let currentTodoList = allTasks[idTodoList]
    let currentTask = currentTodoList.find((oneTask) => oneTask.id === idTask)
    if (currentTask) {
      currentTask.taskTitle = newTitle;
      // allTasks[idTodoList] = [...currentTodoList]
      setAllTasks({ ...allTasks })
    }
  }

  function changeFilter(value: filterForAllTasksType, todoListId: string) {
    let currentTodoList = todoLists.find((oneTodoList) => oneTodoList.id === todoListId)
    if (currentTodoList) {
      currentTodoList.filter = value
      setTodoLists([...todoLists])
    }
  }

  function deleteTodoList(idTodoList: string) {
    let currentTodoList = todoLists.filter((oneTodoList) => oneTodoList.id !== idTodoList)
    setTodoLists(currentTodoList)
    delete allTasks[idTodoList]
    setAllTasks(allTasks)
  }

  function addTodoList(title: string) {
    let newTodoList: TodoListType = {
      id: v1(),
      title: title,
      filter: 'all',
      rating: 0
    }
    setTodoLists([...todoLists, newTodoList])
    setAllTasks({ ...allTasks, [newTodoList.id]: [] })
  }

  function changeTodoListTitle(id: string, newTitle: string) {
    const currentTodoList = todoLists.find((oneTodoList) => oneTodoList.id === id)
    if (currentTodoList) {
      currentTodoList.title = newTitle
      setTodoLists([...todoLists])
    }

  }

  return (
    <div className={'App'}>
      <AddItemForm
        addItem={addTodoList} />
      {
        todoLists.map((oneTodoList) => {

          let finalTasks = allTasks[oneTodoList.id]

          if (oneTodoList.filter === 'active') {
            finalTasks = allTasks[oneTodoList.id].filter((oneTask) => {
              return oneTask.isDone === false
            })
          }

          if (oneTodoList.filter === 'completed') {
            finalTasks = allTasks[oneTodoList.id].filter((oneTask) => {
              return oneTask.isDone === true
            })
          }

          return (
            <TodoList
              key={oneTodoList.id}
              id={oneTodoList.id}
              title={oneTodoList.title}
              tasks={finalTasks}
              rating={oneTodoList.rating}
              deleteOneTask={deleteOneTask}
              changeFilter={changeFilter}
              addOneTask={addOneTask}
              changeIsDone={changeIsDone}
              filter={oneTodoList.filter}
              deleteTodoList={deleteTodoList}
              changeTaskTitle={changeTaskTitle} 
              changeTodoListTitle={changeTodoListTitle}/>)
        })
      }
    </div>
  )
}

export default App