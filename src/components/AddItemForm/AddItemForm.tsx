import React, { useState } from 'react';

type AddItemFormType = {
  addItem: (title: string) => void;
};

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
      <input
        value={title}
        onChange={onChangeTitle}
        onKeyDown={onEnterAddItem}
        className={error ? 'input-error' : ''}
      />
      <button onClick={addItem}>+</button>
      {error && <div className="error">Please enter new title</div>}
    </div>
  );
};
