import { v1 } from 'uuid';
import { FilterValueType, TodoListType } from '../App';
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodoListAC,
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
  const endState = todolistReducer(startState, RemoveTodoListAC(todolistId1));
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
  const endState = todolistReducer(startState, AddTodoListAC(newTodolistTitle));
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
  const endState = todolistReducer(
    startState,
    ChangeTodoListTitleAC(newTodolistTitle, todolistId2)
  );
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
  const endState = todolistReducer(
    startState,
    ChangeTodoListFilterAC(newTodolistFilter, todolistId2)
  );
  //3.
  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newTodolistFilter);
});
