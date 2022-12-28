import React from 'react';
import { TaskType } from '../../App';

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
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
              <button onClick={() => alert(task.id)}> X</button>
            </li>
          ))}
        </ul>
      ) : (
        <span>Your list is empty</span>
      )}

      <div>
        <button onClick={() => alert('HELLO')}>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};
