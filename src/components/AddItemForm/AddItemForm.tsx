import Button from '@mui/material/Button';
import React, { useState } from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { styled, TextField } from '@mui/material';

type AddItemFormType = {
  addItem: (title: string) => void;
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: 4,
  },
}));

export const AddItemForm = (props: AddItemFormType) => {
  const [title, setTitle] = useState<string | undefined>();
  const [error, setError] = useState<boolean>(false);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    error && setError(false);
  };

  const onEnterAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  const addItem = () => {
    const trimmedTitle = title?.trim();
    if (trimmedTitle) {
      props.addItem(trimmedTitle);
    } else {
      setError(true);
    }
    setTitle('');
  };

  return (
    <div>
      {/* <input
        value={title}
        onChange={onChangeTitle}
        onKeyDown={onEnterAddItem}
        className
      /> */}
      <StyledTextField
        id="outlined-basic"
        label={'Title'}
        variant="outlined"
        value={title}
        onChange={onChangeTitle}
        onKeyDown={onEnterAddItem}
        error={error ? true : false}
        size="small"
        sx={{ padding: '0px' }}
        helperText={error ? 'Please enter new title' : ''}
      />
      <Button
        onClick={addItem}
        variant="contained"
        size="small"
        sx={{ marginRight: '3px', fontSize: '12px', p: '4px 4px' }}
        endIcon={<PostAddIcon />}
      >
        ADD
      </Button>
    </div>
  );
};
