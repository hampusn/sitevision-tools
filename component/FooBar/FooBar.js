import * as React from 'react';

const FooBar = ({ name }) => {
  return (
    <div>
      {name}
    </div>
  );
};

FooBar.displayName = 'FooBar';

export default FooBar;
