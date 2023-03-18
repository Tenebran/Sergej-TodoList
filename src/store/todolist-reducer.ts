// 1. Должна заменить прежний зоопарк
// 2. Задача - только преобразование стэйта
// 3. Вернуть новый стэйт
import { v1 } from 'uuid';
import { TodoListType } from '../App';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST' as const;
export const ADD_TODOLIST = 'ADD-TODOLIST' as const;

type RemoveTodoListAT = {
  type: typeof REMOVE_TODOLIST;
  id: string;
};

type AddTodoListAT = {
  type: typeof ADD_TODOLIST;
  title: string;
};

export const todolistReducer = (
  todolists: TodoListType[],
  action: RemoveTodoListAT | AddTodoListAT
) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todolists.filter(tl => tl.id !== action.id);
    case 'ADD-TODOLIST':
      const newTodolist: TodoListType = {
        id: v1(),
        title: action.title,
        filter: 'all',
      };
      return [...todolists, newTodolist];
    default:
      return todolists;
  }
};
