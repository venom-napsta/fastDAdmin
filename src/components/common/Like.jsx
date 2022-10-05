import React from 'react';

function Like(props) {
  let { liked } = props;
  let classes = 'Like';
  if (liked) classes = classes + 'd';
  return (
    <div>
      <button onClick={props.onClick}>{`${classes}`}</button>
    </div>
  );
}
export default Like;
