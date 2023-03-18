import { v1 } from 'uuid';
import { FilterValueType, TodoListType } from '../App';
import {
  ADD_TODOLIST,
  CHANGE_FILTER,
  CHANGE_TITLE,
  REMOVE_TODOLIST,
  todolistReducer,
} from '../store/todolist-reducer';

test('correct todolist should be removed', () => {
  //1.
  const todolistId1 = v1();
  const todolistId2 = v1();
  const startState: Array<TodoListType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  //2.
  const endState = todolistReducer(startState, { type: REMOVE_TODOLIST, id: todolistId1 });
  //3.
  expect(endState?.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  //1.
  const todolistId1 = v1();
  const todolistId2 = v1();
  const newTodolistTitle = 'New Todolist';
  const startState: Array<TodoListType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  //2.
  const endState = todolistReducer(startState, { type: ADD_TODOLIST, title: newTodolistTitle });
  //3.
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
  //1.
  const todolistId1 = v1();
  const todolistId2 = v1();
  const newTodolistTitle = 'New Todolist';
  const startState: Array<TodoListType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  //2.
  const endState = todolistReducer(startState, {
    type: CHANGE_TITLE,
    id: todolistId2,
    title: newTodolistTitle,
  });
  //3.
  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct todolist should change filter', () => {
  //1.
  const todolistId1 = v1();
  const todolistId2 = v1();
  const newTodolistFilter = 'active' as FilterValueType;
  const startState: Array<TodoListType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  //2.
  const endState = todolistReducer(startState, {
    type: CHANGE_FILTER,
    id: todolistId2,
    filter: newTodolistFilter,
  });
  //3.
  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newTodolistFilter);
});
