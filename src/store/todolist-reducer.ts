// 1. Должна заменить прежний зоопарк
// 2. Задача - только преобразование стэйта
// 3. Вернуть новый стэйт
import { v1 } from 'uuid';
import { TodoListType } from '../App';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST' as const;
export const ADD_TODOLIST = 'ADD-TODOLIST' as const;
export const CHANGE_TITLE = 'CHANGE-TODOLIST-TITLE' as const;

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

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT;

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
    default:
      return todoLists;
  }
};
