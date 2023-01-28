import React, { ChangeEvent } from 'react';
import { FilterValueType, TaskType } from '../../App';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { EditTableSpan } from '../EditTableSpan/EditTableSpan';

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  onDelete: (id: string, todolistID: string) => void;
  filter: FilterValueType;
  changeFilter: (value: FilterValueType, todolistID: string) => void;
  addTask: (title: string, todolistID: string) => void;
  chageTaskStatus: (id: string, isDone: boolean, todolistID: string) => void;
  todolistId: string;
  removeTodolist: (id: string) => void;
  changeTaskTitle: (taskId: string, title: string, todolistID: string) => void;
  changeTodolistTitle: (title: string, todolistId: string) => void;
};

export const TodoList = (props: TodoListPropsType) => {
  const onCklickHandlerCreator = (value: FilterValueType) => () =>
    props.changeFilter(value, props.todolistId);

  const addNewTask = (taskTitle: string) => {
    props.addTask(taskTitle, props.todolistId);
  };

  const changeTaskTitle = (title: string) => {
    props.changeTodolistTitle(title, props.todolistId);
  };

  return (
    <div>
      <h3>
        <EditTableSpan title={props.title} changeTilte={changeTaskTitle} />
        <button onClick={() => props.removeTodolist(props.todolistId)}>X</button>
      </h3>
      <AddItemForm addItem={addNewTask} />
      {props.tasks.length ? (
        <ul>
          {props.tasks.map(task => {
            const removeTask = () => props.onDelete(task.id, props.todolistId);
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
              props.chageTaskStatus(task.id, e.currentTarget.checked, props.todolistId);
            const changeTaskTitle = (title: string) => {
              props.changeTaskTitle(task.id, title, props.todolistId);
            };
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={e => changeTaskStatus(e)} />
                <div className={task.isDone ? 'taskIsDone' : ''} style={{ display: 'inline' }}>
                  <EditTableSpan title={task.title} changeTilte={changeTaskTitle} />
                </div>
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
