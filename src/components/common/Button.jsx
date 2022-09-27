import { Button as Btn } from '@mui/material';
import React from 'react';

function IconButton({ iconname, iconSize, iconColor, onClick }) {
  return (
    <div
      onClick={onclick}
      className="text-[#39569c] hover:text-gray-900 dark:hover:text-white"
    >
      <i
        onClick={onClick}
        className={`fa fa-${iconname} ${iconSize} ${iconColor}`}
      />
    </div>
  );
}

function AppButton({ title, btnSize, btnColor, onClick, ...rest }) {
  return (
    <span
      onClick={onClick}
      className="text-[#39569c] hover:text-gray-900 dark:hover:text-white"
    >
      <Btn size={btnSize} color={btnColor} {...rest}>
        <i onClick={onClick} className={`fa fa-${rest.iconname}`} />
        &nbsp; &nbsp;
        {title}
      </Btn>
    </span>
  );
}

export { IconButton, AppButton };
