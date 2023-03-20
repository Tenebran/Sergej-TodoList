import { v1 } from 'uuid';
import { FilterValueType, TasksStateType, TodoListType } from '../App';

export const REMOVE_TASK = 'REMOVE-TASK' as const;
export const ADD_TASK = 'ADD-TASK' as const;
export const CHANGE_TASK_STATUS = 'CHANHE-TASK-STATUS' as const;
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

type ChangeTaskStatusAT = {
  type: typeof CHANGE_TASK_STATUS;
  id: string;
  status: boolean;
  todolistId: string;
};

type ChangeTodoListFilterAT = {
  type: '';
  id: string;
  filter: FilterValueType;
};

type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTodoListFilterAT;

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

    default:
      return task;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
  return { type: 'REMOVE-TASK', taskId, todolistId };
};

export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
  return { type: 'ADD-TASK', title, todolistId };
};

export const changeTaskStatusAC = (
  id: string,
  status: boolean,
  todolistId: string
): ChangeTaskStatusAT => {
  return { type: 'CHANHE-TASK-STATUS', id, status, todolistId };
};
