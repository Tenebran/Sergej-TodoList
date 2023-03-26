import { v1 } from 'uuid';
import { FilterValueType, TodoListType } from '../App';
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodoListTitleAC,
  RemoveTodoListAC,
  todolistReducer,
} from '../store/todolist-reducer';

let todolistId1 = v1();
let todolistId2 = v1();
let startState: Array<TodoListType>;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
});

test('correct todolist should be removed', () => {
  //2.
  const endState = todolistReducer(startState, RemoveTodoListAC(todolistId1));
  //3.
  expect(endState?.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const newTodolistTitle = 'New Todolist';
  //2.
  const endState = todolistReducer(startState, AddTodoListAC(newTodolistTitle));
  //3.
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
  const newTodolistTitle = 'New Todolist';
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
  const newTodolistFilter = 'active' as FilterValueType;
  const endState = todolistReducer(
    startState,
    ChangeTodoListFilterAC(newTodolistFilter, todolistId2)
  );
  //3.
  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newTodolistFilter);
});
