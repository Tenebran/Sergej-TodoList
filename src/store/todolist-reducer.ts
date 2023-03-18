// 1. Должна заменить прежний зоопарк
// 2. Задача - только преобразование стэйта
// 3. Вернуть новый стэйт
import { TodoListType } from '../App';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST' as const;

type RemoveTodoListAT = {
  type: typeof REMOVE_TODOLIST;
  id: string;
};

export const todolistReducer = (todolists: TodoListType[], action: RemoveTodoListAT) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todolists.filter(tl => tl.id !== action.id);

    default:
      return todolists;
  }
};
