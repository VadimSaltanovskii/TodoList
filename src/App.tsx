import React, { useState } from 'react'
import './App.css'
import { OneTaskType, TodoList } from './components/TodoList/TodoList'
import { v1 } from 'uuid'

export type filterForAllTasksType = 'all' | 'active' | 'completed'

export type RatingType = 0 | 1 | 2 | 3 | 4 | 5

export type TodoListType = {
  id: string
  title: string
  filter: filterForAllTasksType
  rating: RatingType
}

function App() {

  // let [whatToLearnArray, setWhatToLearnArray] = useState<Array<OneTaskType>>([
  //   { id: v1(), taskTitle: 'React', isDone: false, difficult: 5 },
  //   { id: v1(), taskTitle: 'Redux', isDone: false, difficult: 5 },
  //   { id: v1(), taskTitle: 'HTML', isDone: true, difficult: 2 },
  //   { id: v1(), taskTitle: 'CSS', isDone: true, difficult: 3 },
  //   { id: v1(), taskTitle: 'JS', isDone: true, difficult: 4 },
  // ])

  let [todoListId1, todoListId2, todoListId3] = [v1(), v1(), v1()]

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn', filter: 'all', rating: 4 },
    { id: todoListId2, title: 'What to buy', filter: 'all', rating: 3 },
    { id: todoListId3, title: 'What to do', filter: 'all', rating: 5 }
  ])

  let [allTasks, setAllTasks] = useState(
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
        { id: v1(), taskTitle: 'Job', isDone: false, difficult: 5 },
        { id: v1(), taskTitle: 'House', isDone: false, difficult: 5 },
        { id: v1(), taskTitle: 'Son', isDone: true, difficult: 5 },
        { id: v1(), taskTitle: 'Happy life', isDone: true, difficult: 5 },
        { id: v1(), taskTitle: 'Money', isDone: true, difficult: 5 },
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

  return (
    <div className={'App'}>
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
              deleteTodoList={deleteTodoList} />)
        })
      }
    </div>
  )
}

export default App