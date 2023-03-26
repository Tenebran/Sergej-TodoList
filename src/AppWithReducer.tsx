import React, { useReducer, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/system';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { todolistReducer } from './store/todolist-reducer';
import { tasksReducer } from './store/task-reducer';

export type TaskType = { id: string; title: string; isDone: boolean };

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TasksStateType = {
  [todolistId: string]: Array<TaskType>;
};

function AppWithReducer() {
  const id_1 = v1();
  const id_2 = v1();

  const [tasks, setTasks] = useReducer(tasksReducer, {
    [id_1]: [
      { id: v1(), title: 'HTML & CSS', isDone: true },
      { id: v1(), title: 'JS & TS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
    ],
    [id_2]: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Meat', isDone: true },
      { id: v1(), title: 'Wheat', isDone: false },
    ],
  });
  const [todoLists, setTodoList] = useReducer(todolistReducer, [
    {
      id: id_1,
      title: 'What to learn',
      filter: 'all',
    },
    {
      id: id_2,
      title: 'What to buy',
      filter: 'all',
    },
  ]);
  // BLL:

  const onDelete = (id: string, todolistID: string) => {
    setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(list => list.id !== id) });
  };

  const addTodolist = (title: string) => {
    const newTodolist: TodoListType = {
      id: v1(),
      title,
      filter: 'all',
    };
    setTodoList([...todoLists, newTodolist]);
    setTasks({ ...tasks, [newTodolist.id]: [] });
  };
  const removeTodolist = (id: string) => {
    setTodoList(todoLists.filter(tl => tl.id !== id));
    delete tasks[id];
  };

  const chageTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map(t => (t.id === id ? { ...t, isDone } : t)),
    });
  };

  const changeTaskFilter = (value: FilterValueType, todolistID: string) => {
    setTodoList(todoLists.map(t => (t.id === todolistID ? { ...t, filter: value } : t)));
  };

  const addTask = (title: string, todolistID: string) => {
    setTasks({
      ...tasks,
      [todolistID]: [{ id: v1(), title, isDone: false }, ...tasks[todolistID]],
    });
  };

  const getFilteredTask = (task: Array<TaskType>, filter: FilterValueType): Array<TaskType> => {
    switch (filter) {
      case 'active':
        return task.filter(task => !task.isDone);
      case 'completed':
        return task.filter(task => task.isDone);
      default:
        return task;
    }
  };

  const changeTaskTitle = (taskId: string, title: string, todolistID: string) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map(t => (t.id === taskId ? { ...t, title } : t)),
    });
  };

  const changeTodolistTitle = (title: string, todolistId: string) => {
    setTodoList(todoLists.map(t => (t.id === todolistId ? { ...t, title } : t)));
  };

  return (
    <div className="app">
      <AppBar position="sticky">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container sx={{ p: '20px 0 40px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={6}>
          {todoLists.map((t: TodoListType) => {
            return (
              <Grid item>
                <Paper sx={{ p: '20px' }} elevation={16}>
                  <TodoList
                    key={t.id}
                    title={t.title}
                    tasks={getFilteredTask(tasks[t.id], t.filter)}
                    onDelete={onDelete}
                    filter={t.filter}
                    changeFilter={changeTaskFilter}
                    addTask={addTask}
                    chageTaskStatus={chageTaskStatus}
                    todolistId={t.id}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducer;
