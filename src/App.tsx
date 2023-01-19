import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { v1 } from 'uuid';

export type TaskType = { id: string; title: string; isDone: boolean };

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

type TasksStateType = {
  [todolistId: string]: Array<TaskType>;
};

function App() {
  const id_1 = v1();
  const id_2 = v1();

  const [tasks, setTasks] = useState<TasksStateType>({
    [id_1]: [
      { id: v1(), title: 'HTML & CSS', isDone: true },
      { id: v1(), title: 'JS & TS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
    ],
    [id_2]: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Meat', isDone: true },
      { id: v1(), title: 'Wheat', isDone: false },
    ],
  });
  const [todoLists, setTodoList] = useState<TodoListType[]>([
    {
      id: id_1,
      title: 'What to learn',
      filter: 'all',
    },
    {
      id: id_2,
      title: 'What to buy',
      filter: 'all',
    },
  ]);
  // BLL:

  const onDelete = (id: string, todolistID: string) => {
    setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(list => list.id !== id) });
  };

  const removeTodolist = (id: string) => {
    setTodoList(todoLists.filter(tl => tl.id !== id));
    delete tasks[id];
  };

  const chageTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map(t => (t.id === id ? { ...t, isDone } : t)),
    });
  };

  const changeFilter = (value: FilterValueType, todolistID: string) => {
    setTodoList(todoLists.map(t => (t.id === todolistID ? { ...t, filter: value } : t)));
  };

  const addTask = (title: string, todolistID: string) => {
    setTasks({
      ...tasks,
      [todolistID]: [{ id: v1(), title, isDone: false }, ...tasks[todolistID]],
    });
  };

  const getFilteredTask = (task: Array<TaskType>, filter: FilterValueType): Array<TaskType> => {
    switch (filter) {
      case 'active':
        return task.filter(task => !task.isDone);
      case 'completed':
        return task.filter(task => task.isDone);
      default:
        return task;
    }
  };

  return (
    <div className="app">
      {todoLists.map((t: TodoListType) => {
        return (
          <TodoList
            key={t.id}
            title={t.title}
            tasks={getFilteredTask(tasks[t.id], t.filter)}
            onDelete={onDelete}
            filter={t.filter}
            changeFilter={changeFilter}
            addTask={addTask}
            chageTaskStatus={chageTaskStatus}
            todolistId={t.id}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
