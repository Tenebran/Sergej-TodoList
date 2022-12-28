import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

export type TaskType = { id: number; title: string; isDone: boolean };

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
  const [tasksForTodoList, setTasksForTodoList] = useState<Array<TaskType>>([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS & TS', isDone: true },
    { id: 3, title: 'React', isDone: false },
  ]);

  console.log('hello');
  const [filter, setFilter] = useState<FilterValueType>('all');

  // BLL:
  const todoListTitle: string = 'What to learn';
  // const tasks: Array<TaskType> =

  const onDelete = (id: number) => {
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
