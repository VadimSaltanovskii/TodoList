import React, { useReducer, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { ChangeRatingTodoListAC, todoListsReducer } from './state/todolists-reducer';

export type OneTask = {
  id: string
  title: string
  isDone: boolean
  difficult: RatingType
}

export type TodoListType = {
  id: string
  title: string
  filter: FilterType
  rating: RatingType
}

export type InitialStateType = {
  [key: string]: Array<OneTask>
}

export type FilterType = 'all' | 'active' | 'completed';
export type RatingType = 0 | 1 | 2 | 3 | 4 | 5


function App() {
  // BLL
  let [todoListId1, todoListId2, todoListId3] = [v1(), v1(), v1()]

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to buy', filter: 'all', rating: 5 },
    { id: todoListId2, title: 'What to learn', filter: 'all', rating: 4 },
    { id: todoListId3, title: 'Products', filter: 'all', rating: 0 },
  ])

  let [todoLists2, dispatchToTodoListsReducer] = useReducer(todoListsReducer, [
    { id: todoListId1, title: 'What to buy', filter: 'all', rating: 5 },
    { id: todoListId2, title: 'What to learn', filter: 'all', rating: 4 },
    { id: todoListId3, title: 'Products', filter: 'all', rating: 0 },
  ])

  let [initialTasks, setInitialTasks] = useState<InitialStateType>({
    [todoListId1]: [
      { id: v1(), title: 'MacBook', isDone: false, difficult: 3 },
      { id: v1(), title: 'iPhone', isDone: true, difficult: 2 },
      { id: v1(), title: 'BMW', isDone: false, difficult: 5 },
      { id: v1(), title: 'House', isDone: false, difficult: 5 },
      { id: v1(), title: 'Villa', isDone: false, difficult: 5 },
      { id: v1(), title: 'Chicken legs', isDone: true, difficult: 0 },
      { id: v1(), title: 'Apple Watch', isDone: true, difficult: 2 },
    ],
    [todoListId2]: [
      { id: v1(), title: 'HTML', isDone: true, difficult: 2 },
      { id: v1(), title: 'CSS', isDone: true, difficult: 2 },
      { id: v1(), title: 'JS', isDone: true, difficult: 4 },
      { id: v1(), title: 'REACT', isDone: false, difficult: 5 },
      { id: v1(), title: 'REDUX', isDone: false, difficult: 5 },
      { id: v1(), title: 'MobX', isDone: false, difficult: 5 },
      { id: v1(), title: 'Angular', isDone: false, difficult: 5 },
    ],
    [todoListId3]: [
      { id: v1(), title: 'Bred', isDone: true, difficult: 0 },
      { id: v1(), title: 'Milk', isDone: true, difficult: 0 },
      { id: v1(), title: 'Ham', isDone: true, difficult: 0 },
      { id: v1(), title: 'Chicken', isDone: true, difficult: 0 },
      { id: v1(), title: 'Vegetables', isDone: true, difficult: 0 },
      { id: v1(), title: 'Onion', isDone: true, difficult: 0 },
    ],

  })

  //functions for todoLists
  function deleteTodoList(idTodoList: string) {
    setTodoLists(todoLists.filter((oneTodoList) => oneTodoList.id !== idTodoList))
    delete initialTasks[idTodoList]
    setInitialTasks({ ...initialTasks })
  }
  function addOneTodoList(newTitle: string) {
    if (todoLists.find((oneTodoList) => oneTodoList.title === newTitle) === undefined) {
      let newTodoList: TodoListType = { id: v1(), title: newTitle, filter: 'all', rating: 0 }
      setTodoLists([...todoLists, newTodoList])
      initialTasks[newTodoList.id] = [
        { id: v1(), title: 'Заглушка', isDone: false, difficult: 0 }
      ]
      setInitialTasks({ ...initialTasks })
    }
  }
  function changeTodoListTitle(newTitle: string, idTodoList: string) {
    let currentTodoList = todoLists.find((oneTodoList) => oneTodoList.id === idTodoList)
    if (currentTodoList) {
      currentTodoList.title = newTitle
      setTodoLists([...todoLists])
    }
  }
  function changeFilter(newFilter: FilterType, idTodoList: string): void {
    let currentTodoList = todoLists.find((oneTodoList) => oneTodoList.id === idTodoList)
    if (currentTodoList) {
      currentTodoList.filter = newFilter
      setTodoLists([...todoLists])
    }
  }

  function changeRating(newRating: RatingType, idTodoList: string): void {
    dispatchToTodoListsReducer(ChangeRatingTodoListAC(idTodoList, newRating))
  }

  //functions for tasks
  function deleteOneTask(idTask: string, idTodoList: string): void {
    let currentTodoList = initialTasks[idTodoList]
    initialTasks[idTodoList] = currentTodoList.filter((oneTask) => oneTask.id !== idTask)
    setInitialTasks({ ...initialTasks })
  }
  function addOneTask(newTitle: string, idTodoList: string) {
    let currentTodoList = initialTasks[idTodoList]
    if (currentTodoList.find((oneTask) => oneTask.title === newTitle) === undefined) {
      let newTask: OneTask = { id: v1(), title: newTitle, isDone: false, difficult: 0 }
      initialTasks[idTodoList] = [...currentTodoList, newTask]
      setInitialTasks({ ...initialTasks })
    } else {
      alert('Title is exists')
    }
  }
  function changeIsDone(idTask: string, idTodoList: string) {
    let currentTodoList = initialTasks[idTodoList]
    let currentTask = currentTodoList.find((oneTask) => oneTask.id === idTask)
    if (currentTask) {
      currentTask.isDone = !currentTask.isDone
      setInitialTasks({ ...initialTasks })
    } else {
      alert('Tasks not found')
    }
  }
  function changeTaskTitle(newTitle: string, idTodoList: string, idTask: string) {
    let currentTask = initialTasks[idTodoList].find((oneTask) => oneTask.id === idTask)
    if (currentTask) {
      currentTask.title = newTitle
      setInitialTasks({ ...initialTasks })
    }
  }

  return (
    <div className={"App"}>
      <AppBar position="static" color={'secondary'} variant={'elevation'}>
        <Toolbar>
          <IconButton edge="start" color="default" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" color={'inherit'}>
            START CONTROL YOUR DEAL
    </Typography>
          <Button color="default">Login</Button>
        </Toolbar>
      </AppBar>
      <Header />
      <Container fixed={true}>
        <Grid container direction={'column'} justify={'center'} alignContent={'center'} alignItems={'center'}>
          <p>Add new Todo List</p>
          <AddItemForm addItem={addOneTodoList} />
        </Grid>

        <Grid container direction={'row'} justify={'center'} spacing={3}>
          {
            todoLists.map((oneTodoList) => {
              // another
              let finalTasksToReact: Array<OneTask> = initialTasks[oneTodoList.id];
              switch (oneTodoList.filter) {
                case 'all':
                  finalTasksToReact = initialTasks[oneTodoList.id];
                  break;
                case 'active':
                  finalTasksToReact = initialTasks[oneTodoList.id].filter((oneTask) => oneTask.isDone === false)
                  break;
                case 'completed':
                  finalTasksToReact = initialTasks[oneTodoList.id].filter((oneTask) => oneTask.isDone === true)
                  break
                default:
                  break;
              }
              return (
                <Grid item>
                  <Paper elevation={3}>
                    <TodoList
                      title={oneTodoList.title}
                      tasks={finalTasksToReact}
                      deleteOneTask={deleteOneTask}
                      changeFilter={changeFilter}
                      addOneTask={addOneTask}
                      changeIsDone={changeIsDone}
                      filter={oneTodoList.filter}
                      rating={oneTodoList.rating}
                      id={oneTodoList.id}
                      deleteTodoList={deleteTodoList}
                      changeTaskTitle={changeTaskTitle}
                      changeTodoListTitle={changeTodoListTitle}
                      changeTodoListRating={changeRating} />
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default App;
