import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todoListsReducer } from "./todolists-reducer";

// Основной редьюсер - он один
const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
});

// Функция создания стора
export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
