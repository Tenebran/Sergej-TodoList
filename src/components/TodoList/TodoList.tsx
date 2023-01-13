import React, { useState } from 'react';
import { FilterValueType, TaskType } from '../../App';

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  onDelete: (id: string) => void;
  filter: FilterValueType;
  changeFilter: (value: FilterValueType) => void;
  addTask: (title: string) => void;
  chageTaskStatus: (id: string) => void;
};

export const TodoList = (props: TodoListPropsType) => {
  const [title, setTitle] = useState<string | undefined>();

  const addTask = () => {
    title && props.addTask(title);
    setTitle('');
  };

  const onEnterAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onCklickHandlerCreator = (value: FilterValueType) => () => props.changeFilter(value);

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={title} onChange={onChangeTitle} onKeyDown={onEnterAddTask} />
        <button onClick={addTask} disabled={!title}>
          +
        </button>
      </div>
      {props.tasks.length ? (
        <ul>
          {props.tasks.map(task => {
            const removeTask = () => props.onDelete(task.id);
            return (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => props.chageTaskStatus(task.id)}
                />{' '}
                <span>{task.title}</span>
                <button onClick={removeTask}> X</button>
              </li>
            );
          })}
        </ul>
      ) : (
        <span>Your list is empty</span>
      )}

      <div>
        <button onClick={onCklickHandlerCreator('all')}>All</button>
        <button onClick={onCklickHandlerCreator('active')}>Active</button>
        <button onClick={onCklickHandlerCreator('completed')}>Completed</button>
      </div>
    </div>
  );
};
