import React, { ChangeEvent, useState } from 'react';
import { FilterValueType, TaskType } from '../../App';

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  onDelete: (id: string) => void;
  filter: FilterValueType;
  changeFilter: (value: FilterValueType) => void;
  addTask: (title: string) => void;
  chageTaskStatus: (id: string, isDone: boolean) => void;
};

export const TodoList = (props: TodoListPropsType) => {
  const [title, setTitle] = useState<string | undefined>();
  const [error, setError] = useState<boolean>(false);

  const addTask = () => {
    const trimmedTitle = title?.trim();
    if (trimmedTitle) {
      props.addTask(trimmedTitle);
    } else {
      setError(true);
    }
    setTitle('');
  };

  const onEnterAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    error && setError(false);
  };

  const onCklickHandlerCreator = (value: FilterValueType) => () => props.changeFilter(value);

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeTitle}
          onKeyDown={onEnterAddTask}
          className={error ? 'input-error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error">Please enter task title</div>}
      </div>
      {props.tasks.length ? (
        <ul>
          {props.tasks.map(task => {
            const removeTask = () => props.onDelete(task.id);
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
              props.chageTaskStatus(task.id, e.currentTarget.checked);
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={e => changeTaskStatus(e)} />
                <span className={task.isDone ? 'taskIsDone' : ''}>{task.title}</span>
                <button onClick={removeTask}> X</button>
              </li>
            );
          })}
        </ul>
      ) : (
        <span>Your list is empty</span>
      )}

      <div>
        <button
          className={props.filter === 'all' ? 'btn-active' : ''}
          onClick={onCklickHandlerCreator('all')}
        >
          All
        </button>
        <button
          onClick={onCklickHandlerCreator('active')}
          className={props.filter === 'active' ? 'btn-active' : ''}
        >
          Active
        </button>
        <button
          onClick={onCklickHandlerCreator('completed')}
          className={props.filter === 'completed' ? 'btn-active' : ''}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
