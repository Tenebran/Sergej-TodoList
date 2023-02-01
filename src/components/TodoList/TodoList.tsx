import { Button, Checkbox, IconButton, List, ListItem, Typography } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { FilterValueType, TaskType } from '../../App';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { EditTableSpan } from '../EditTableSpan/EditTableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  onDelete: (id: string, todolistID: string) => void;
  filter: FilterValueType;
  changeFilter: (value: FilterValueType, todolistID: string) => void;
  addTask: (title: string, todolistID: string) => void;
  chageTaskStatus: (id: string, isDone: boolean, todolistID: string) => void;
  todolistId: string;
  removeTodolist: (id: string) => void;
  changeTaskTitle: (taskId: string, title: string, todolistID: string) => void;
  changeTodolistTitle: (title: string, todolistId: string) => void;
};

export const TodoList = (props: TodoListPropsType) => {
  const onCklickHandlerCreator = (value: FilterValueType) => () =>
    props.changeFilter(value, props.todolistId);

  const addNewTask = (taskTitle: string) => {
    props.addTask(taskTitle, props.todolistId);
  };

  const changeTaskTitle = (title: string) => {
    props.changeTodolistTitle(title, props.todolistId);
  };

  return (
    <div>
      <Typography variant="h5" align="center">
        <EditTableSpan title={props.title} changeTilte={changeTaskTitle} />
        <IconButton onClick={() => props.removeTodolist(props.todolistId)}>
          <DeleteIcon color="primary" fontSize="medium" />
        </IconButton>
      </Typography>
      <AddItemForm addItem={addNewTask} />
      {props.tasks.length ? (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {props.tasks.map(task => {
            const removeTask = () => props.onDelete(task.id, props.todolistId);
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
              props.chageTaskStatus(task.id, e.currentTarget.checked, props.todolistId);
            const changeTaskTitle = (title: string) => {
              props.changeTaskTitle(task.id, title, props.todolistId);
            };
            return (
              <ListItem key={task.id} sx={{ p: '0' }}>
                <Checkbox
                  checked={task.isDone}
                  defaultChecked
                  size="small"
                  onChange={e => changeTaskStatus(e)}
                />
                <div className={task.isDone ? 'taskIsDone' : ''} style={{ display: 'inline' }}>
                  <EditTableSpan title={task.title} changeTilte={changeTaskTitle} />
                </div>
                <IconButton onClick={removeTask}>
                  <DeleteIcon color="primary" fontSize="small" />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <span>Your list is empty</span>
      )}

      <ButtonGroup fullWidth size="small">
        <Button
          sx={{ marginRight: '3px', fontSize: '12px', p: '4px 4px' }}
          variant={props.filter === 'all' ? 'contained' : 'outlined'}
          onClick={onCklickHandlerCreator('all')}
        >
          All
        </Button>
        <Button
          sx={{ marginRight: '3px', fontSize: '12px', p: '4px 4px' }}
          variant={props.filter === 'active' ? 'contained' : 'outlined'}
          onClick={onCklickHandlerCreator('active')}
        >
          Active
        </Button>
        <Button
          sx={{ fontSize: '12px', p: '4px 4px' }}
          variant={props.filter === 'completed' ? 'contained' : 'outlined'}
          onClick={onCklickHandlerCreator('completed')}
        >
          Completed
        </Button>
      </ButtonGroup>
    </div>
  );
};
