import React, { useState } from 'react';

const Node = ({ value, left, right }) => (
  <div className="node">
    {value}
    {left && <Node {...left} />}
    {right && <Node {...right} />}
  </div>
);

const App = () => {
  const [rootNode, setRootNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [selectedTraversal, setSelectedTraversal] = useState('Inorder');
  const [foundNodeInfo, setFoundNodeInfo] = useState(null);
  const [customInputValue, setCustomInputValue] = useState('');

  const handleNodeClick = (value) => {
    setSelectedNode(selectedNode === value ? null : value);
  };

  const handleCustomAdd = () => {
    const numericValue = parseInt(customInputValue);
  
    if (!isNaN(numericValue)) {
      if (!rootNode) {
        // setRootNode({ value: numericValue, left: null, right: null });
        setSelectedNode(numericValue);
      } else if (selectedNode !== null) {
        setRootNode((prevRootNode) => addNodeToSelected(prevRootNode, numericValue));
        setSelectedNode(numericValue); // Set the selected node to the newly added custom node
      }
    }
  
    setCustomInputValue('');
  };
  
  

  const addNodeToSelected = (node, value) => {
    if (!node) return null;

    if (node.value === selectedNode) {
      return {
        ...node,
        right: { value, left: null, right: null },
      };
    }

    return {
      ...node,
      left: addNodeToSelected(node.left, value),
      right: addNodeToSelected(node.right, value),
    };
  };

  const handleAddNode = () => {
    if (!rootNode) {
      setRootNode({ value: 1, left: null, right: null });
      setSelectedNode(1);
    } else if (selectedNode !== null) {
      setRootNode((prevRootNode) => addNodeToSelected(prevRootNode, selectedNode + 1));
    }
    setSelectedNode(null);
  };

  const handleDeleteNode = () => {
    if (rootNode) {
      setRootNode((prevRootNode) => deleteLastAddedNode(prevRootNode));
      setSelectedNode(null);
    }
  };

  const deleteLastAddedNode = (node) => {
    if (!node) return null;

    if (!node.left && !node.right) {
      return null;
    }

    if (node.right) {
      if (!node.right.left && !node.right.right) {
        return { ...node, right: null };
      }
      return { ...node, right: deleteLastAddedNode(node.right) };
    }

    return { ...node, left: deleteLastAddedNode(node.left) };
  };

  const handleSearch = () => {
    const foundNode = searchNode(rootNode, parseInt(searchValue));
    if (foundNode) {
      const nodeInfo = getNodeInfo(rootNode, foundNode.value);
      setFoundNodeInfo(nodeInfo);
    } else {
      setFoundNodeInfo(null);
    }
    setSearchResult(foundNode ? foundNode.value : 'Not Found');
  };

  const searchNode = (node, value) => {
    if (!node) return null;
    if (node.value === value) return node;
    if (value < node.value) return searchNode(node.left, value);
    return searchNode(node.right, value);
  };

  const getNodeInfo = (node, targetValue, parent = null, level = 0) => {
    if (!node) return null;
    if (node.value === targetValue) {
      return { parent, level, children: [node.left, node.right].filter(child => !!child) };
    }
    if (targetValue < node.value) {
      return getNodeInfo(node.left, targetValue, node, level + 1);
    }
    return getNodeInfo(node.right, targetValue, node, level + 1);
  };

  const handleTraversalChange = (event) => {
    setSelectedTraversal(event.target.value);
  };

  const getTraversalValues = () => {
    if (selectedTraversal === 'Inorder') {
      return inorderTraversal(rootNode);
    } else if (selectedTraversal === 'Preorder') {
      return preorderTraversal(rootNode);
    } else if (selectedTraversal === 'Postorder') {
      return postorderTraversal(rootNode);
    }
    return [];
  };

  const inorderTraversal = (node) => {
    if (!node) return [];
    return [...inorderTraversal(node.left), node.value, ...inorderTraversal(node.right)];
  };

  const preorderTraversal = (node) => {
    if (!node) return [];
    return [node.value, ...preorderTraversal(node.left), ...preorderTraversal(node.right)];
  };

  const postorderTraversal = (node) => {
    if (!node) return [];
    return [...postorderTraversal(node.left), ...postorderTraversal(node.right), node.value];
  };

  const traversalValues = getTraversalValues();

  return (
    <div className="bg-gray-200 min-h-screen py-10">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Binary Search Tree React App</h1>
        <div>
          {traversalValues.map((nodeValue, index) => (
            <div
              key={index}
              className={`node ${selectedNode === nodeValue ? 'selected' : ''}`}
              onClick={() => handleNodeClick(nodeValue)}
            >
              <div
                className={`bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center ${
                  selectedNode === nodeValue ? 'bg-red-600' : ''
                }`}
              >
                {nodeValue}
              </div>
            </div>
          ))}
        </div>
        {/* //custom input */}
        <div>
          <input
            type="text"
            placeholder="Enter custom value"
            value={customInputValue}
            onChange={(e) => setCustomInputValue(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleCustomAdd}
          >
            Add Custom Node
          </button>
        </div>

        {/* Add and Delete */}
        <div className='flex mt-4'>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleAddNode}
          >
            Add Node
          </button>

          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-2"
            onClick={handleDeleteNode}
          >
            Delete Last Node
          </button>
        </div>

        {/* Traversing the nodes */}
        <div className="traversal mt-4">
          <select
            value={selectedTraversal}
            onChange={handleTraversalChange}
            className="border p-2 rounded mr-2"
          >
            <option value="Inorder">Inorder</option>
            <option value="Preorder">Preorder</option>
            <option value="Postorder">Postorder</option>
          </select>
          <div className="traversal-values mt-2">
            {traversalValues.map((nodeValue, index) => (
              <span key={index} className="mr-2">
                {nodeValue}
              </span>
            ))}
          </div>
        </div>

        {/* Search node */}
        <div className="search mt-4">
          <input
            type="text"
            placeholder="Search node"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
          {searchResult !== null && (
            <div className="search-result mt-2">
              Found: {searchResult}
              {foundNodeInfo && (
                <div>
                  Parent: {foundNodeInfo.parent ? foundNodeInfo.parent.value : 'None'}
                  <br />
                  Children: {foundNodeInfo.children.map(child => child.value).join(', ') || 'None'}
                  <br />
                  Level: {foundNodeInfo.level}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
