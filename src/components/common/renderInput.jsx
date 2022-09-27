import React from "react";

function TextInput({ name, label, error, ...rest }) {
  return (
    <>
      <input
        {...rest}
        name={name}
        id={name}
        className="w-full h-13.5 border-1 rounded-md bg-transparent "
      />
    </>
  );
}

export default TextInput;
