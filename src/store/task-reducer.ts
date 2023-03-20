import { v1 } from 'uuid';
import { FilterValueType, TasksStateType, TodoListType } from '../App';

export const REMOVE_TASK = 'REMOVE-TASK' as const;
export const ADD_TASK = 'ADD-TASK' as const;
export const CHANGE_TITLE = 'CHANGE-TODOLIST-TITLE' as const;
export const CHANGE_FILTER = 'CHANGE-TODOLIST-FILTER' as const;

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

type ChangeTodoListTitleAT = {
  type: '';
  id: 'string';
  title: 'string';
};

type ChangeTodoListFilterAT = {
  type: '';
  id: string;
  filter: FilterValueType;
};

type ActionType = RemoveTaskAT | AddTaskAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT;

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

    default:
      return;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
  return { type: 'REMOVE-TASK', taskId, todolistId };
};

export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
  return { type: 'ADD-TASK', title, todolistId };
};
