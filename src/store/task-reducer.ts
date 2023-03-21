import { v1 } from 'uuid';
import { TasksStateType } from '../App';
import { AddTodoListAT, ADD_TODOLIST, RemoveTodoListAT, REMOVE_TODOLIST } from './todolist-reducer';

export const REMOVE_TASK = 'REMOVE-TASK' as const;
export const ADD_TASK = 'ADD-TASK' as const;
export const CHANGE_TASK_STATUS = 'CHANHE-TASK-STATUS' as const;
export const CHANGE_TASK_TITLE = 'CHANHE-TASK-TITLE' as const;

type RemoveTaskAT = {
  type: typeof REMOVE_TASK;
  taskId: string;
  todolistId: string;
};

type AddTaskAT = {
  type: typeof ADD_TASK;
  todolistId: string;
  title: string;
};

type ChangeTaskStatusAT = {
  type: typeof CHANGE_TASK_STATUS;
  id: string;
  status: boolean;
  todolistId: string;
};

type ChangeTaskTitleAT = {
  type: typeof CHANGE_TASK_TITLE;
  id: string;
  title: string;
  todolistId: string;
};

type ActionType =
  | RemoveTaskAT
  | AddTaskAT
  | ChangeTaskStatusAT
  | ChangeTaskTitleAT
  | AddTodoListAT
  | RemoveTodoListAT;

export const tasksReducer = (task: TasksStateType, action: ActionType) => {
  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...task,
        [action.todolistId]: task[action.todolistId].filter(t => t.id !== action.taskId),
      };

    case ADD_TASK:
      return {
        ...task,
        [action.todolistId]: [
          { id: v1(), title: action.title, isDone: false },
          ...task[action.todolistId],
        ],
      };

    case CHANGE_TASK_STATUS:
      return {
        ...task,
        [action.todolistId]: task[action.todolistId].map(t =>
          t.id === action.id ? { ...t, isDone: action.status } : t
        ),
      };

    case CHANGE_TASK_TITLE:
      return {
        ...task,
        [action.todolistId]: task[action.todolistId].map(t =>
          t.id === action.id ? { ...t, title: action.title } : t
        ),
      };
    case ADD_TODOLIST:
      return { ...task, [action.todolistId]: [] };

    case REMOVE_TODOLIST:
      let copyTask = { ...task };
      delete copyTask[action.id];
      return copyTask;

    default:
      return task;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
  return { type: REMOVE_TASK, taskId, todolistId };
};

export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
  return { type: ADD_TASK, title, todolistId };
};

export const changeTaskStatusAC = (
  id: string,
  status: boolean,
  todolistId: string
): ChangeTaskStatusAT => {
  return { type: CHANGE_TASK_STATUS, id, status, todolistId };
};

export const changeTaskTitleAC = (
  id: string,
  title: string,
  todolistId: string
): ChangeTaskTitleAT => {
  return { type: CHANGE_TASK_TITLE, id, title, todolistId };
};
