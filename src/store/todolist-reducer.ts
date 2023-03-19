// 1. Должна заменить прежний зоопарк
// 2. Задача - только преобразование стэйта
// 3. Вернуть новый стэйт
import { v1 } from 'uuid';
import { FilterValueType, TodoListType } from '../App';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST' as const;
export const ADD_TODOLIST = 'ADD-TODOLIST' as const;
export const CHANGE_TITLE = 'CHANGE-TODOLIST-TITLE' as const;
export const CHANGE_FILTER = 'CHANGE-TODOLIST-FILTER' as const;

type RemoveTodoListAT = {
  type: typeof REMOVE_TODOLIST;
  id: string;
};

type AddTodoListAT = {
  type: typeof ADD_TODOLIST;
  title: string;
};

type ChangeTodoListTitleAT = {
  type: typeof CHANGE_TITLE;
  id: string;
  title: string;
};

type ChangeTodoListFilterAT = {
  type: typeof CHANGE_FILTER;
  id: string;
  filter: FilterValueType;
};

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT;

export const todolistReducer = (todoLists: TodoListType[], action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todoLists.filter(tl => tl.id !== action.id);
    case 'ADD-TODOLIST':
      const newTodolist: TodoListType = {
        id: v1(),
        title: action.title,
        filter: 'all',
      };
      return [...todoLists, newTodolist];
    case 'CHANGE-TODOLIST-TITLE':
      return todoLists.map(t => (t.id === action.id ? { ...t, title: action.title } : t));
    case 'CHANGE-TODOLIST-FILTER':
      return todoLists.map(t => (t.id === action.id ? { ...t, filter: action.filter } : t));
    default:
      return todoLists;
  }
};

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({
  type: 'REMOVE-TODOLIST',
  id,
});

export const AddTodoListAC = (title: string): AddTodoListAT => ({
  type: 'ADD-TODOLIST',
  title,
});

export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleAT => ({
  type: 'CHANGE-TODOLIST-TITLE',
  title,
  id,
});

export const ChangeTodoListFilterAC = (
  filter: FilterValueType,
  id: string
): ChangeTodoListFilterAT => ({
  type: 'CHANGE-TODOLIST-FILTER',
  filter,
  id,
});
