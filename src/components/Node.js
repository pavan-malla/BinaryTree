import React from 'react';

const Node = ({ value, isSelected, onClick }) => {
  return (
    <div
      className={`node ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default Node;
