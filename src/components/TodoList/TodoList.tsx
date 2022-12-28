import React, { useState } from 'react';
import { FilterValueType, TaskType } from '../../App';

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  onDelete: (id: number) => void;
  filter: FilterValueType;
  changeFilter: (value: FilterValueType) => void;
};

export const TodoList = (props: TodoListPropsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      {props.tasks.length ? (
        <ul>
          {props.tasks.map(task => (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
              <button onClick={() => props.onDelete(task.id)}> X</button>
            </li>
          ))}
        </ul>
      ) : (
        <span>Your list is empty</span>
      )}

      <div>
        <button onClick={() => props.changeFilter('all')}>All</button>
        <button onClick={() => props.changeFilter('active')}>Active</button>
        <button onClick={() => props.changeFilter('completed')}>Completed</button>
      </div>
    </div>
  );
};
