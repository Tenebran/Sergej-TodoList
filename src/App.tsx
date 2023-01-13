import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { v1 } from 'uuid';
import { V4MAPPED } from 'dns';

export type TaskType = { id: string; title: string; isDone: boolean };

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
  const [tasksForTodoList, setTasksForTodoList] = useState<Array<TaskType>>([
    { id: v1(), title: 'HTML & CSS', isDone: true },
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

  const chageTaskStatus = (id: string, isDone: boolean) => {
    setTasksForTodoList(tasksForTodoList.map(t => (t.id === id ? { ...t, isDone } : t)));
  };

  const changeFilter = (value: FilterValueType) => {
    setFilter(value);
  };

  const addTask = (title: string) => {
    setTasksForTodoList([...tasksForTodoList, { id: v1(), title, isDone: false }]);
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
      <TodoList
        title={todoListTitle}
        tasks={getFilteredTask(tasksForTodoList, filter)}
        onDelete={onDelete}
        filter={filter}
        changeFilter={changeFilter}
        addTask={addTask}
        chageTaskStatus={chageTaskStatus}
      />
      {/* <TodoList title={'What to by'} /> */}
    </div>
  );
}

export default App;
