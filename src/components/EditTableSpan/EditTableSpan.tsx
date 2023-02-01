import { styled, TextField } from '@mui/material';
import React, { useState } from 'react';

type EditTableSpanPropsType = {
  title: string;
  changeTilte: (newTitle: string) => void;
};

export const EditTableSpan = (props: EditTableSpanPropsType) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.title);

  const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
      padding: 4,
    },
  }));

  const offEditMode = () => {
    setIsEditMode(false);
    props.changeTilte(title);
  };

  const onEditMode = () => {
    setIsEditMode(true);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onKeyDownOffEditMode = (e: React.KeyboardEvent) => {
    e.key === 'Enter' && offEditMode();
  };
  return (
    <>
      {isEditMode ? (
        // <input
        //   value={title}
        //   autoFocus
        //   onBlur={offEditMode}
        //   onChange={onChangeTitle}
        //   onKeyDown={onKeyDownOffEditMode}
        // />
        <StyledTextField
          autoFocus
          label={'Title'}
          variant="standard"
          value={title}
          onBlur={offEditMode}
          onChange={onChangeTitle}
          onKeyDown={onKeyDownOffEditMode}
          sx={{ padding: '0px' }}
        />
      ) : (
        <span onDoubleClick={onEditMode}>{props.title}</span>
      )}
    </>
  );
};
