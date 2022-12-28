import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

export type TaskType = { id: string; title: string; isDone: boolean };

function App() {
  // BLL:
  const todoListTitle: string = 'What to learn';
  const tasks: Array<TaskType> = [
    { id: '1', title: 'HTML&CSS', isDone: true },
    { id: '2', title: 'JS & TS', isDone: true },
    { id: '3', title: 'React', isDone: false },
  ];

  // GUI:
  return (
    <div className="app">
      <TodoList title={todoListTitle} tasks={tasks} />
      {/* <TodoList title={'What to by'} /> */}
    </div>
  );
}

export default App;
