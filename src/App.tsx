import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { v1 } from 'uuid';

export type TaskType = { id: string; title: string; isDone: boolean };

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
  const [tasksForTodoList, setTasksForTodoList] = useState<Array<TaskType>>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS & TS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValueType>('all');

  // BLL:
  const todoListTitle: string = 'What to learn';
  // const tasks: Array<TaskType> =

  const onDelete = (id: string) => {
    setTasksForTodoList(tasksForTodoList.filter(tasks => tasks.id !== id));
  };

  const changeFilter = (value: FilterValueType) => {
    setFilter(value);
  };

  let filterTasks = tasksForTodoList;

  if (filter === 'active') {
    filterTasks = tasksForTodoList.filter(task => !task.isDone);
  } else if (filter === 'completed') {
    filterTasks = tasksForTodoList.filter(task => !!task.isDone);
  }

  // GUI:
  return (
    <div className="app">
      <TodoList
        title={todoListTitle}
        tasks={filterTasks}
        onDelete={onDelete}
        filter={filter}
        changeFilter={changeFilter}
      />
      {/* <TodoList title={'What to by'} /> */}
    </div>
  );
}

export default App;
