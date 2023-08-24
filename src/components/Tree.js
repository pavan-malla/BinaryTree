import React, { useState } from 'react';
import Node from './Node';

const Tree = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (value) => {
    setSelectedNode(value);
  };

  return (
    <div className="tree">
      {/* Render your binary search tree here */}
      <Node
        value={10}
        isSelected={selectedNode === 10}
        onClick={() => handleNodeClick(10)}
      />
      {/* Add more nodes as needed */}
    </div>
  );
};

export default Tree;
