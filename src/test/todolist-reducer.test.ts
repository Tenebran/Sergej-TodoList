import { v1 } from 'uuid';
import { TodoListType } from '../App';
import { REMOVE_TODOLIST, todolistReducer } from '../store/todolist-reducer';

test('correct todolist should be removed', () => {
  //1.
  const todolistId1 = v1();
  const todolistId2 = v1();
  const startState: Array<TodoListType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to learn', filter: 'all' },
  ];
  //2.
  const endState = todolistReducer(startState, { type: REMOVE_TODOLIST, id: todolistId1 });
  //3.
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});
