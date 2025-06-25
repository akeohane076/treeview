const flattenTree = (node, parentIds = [], flatMap = {}) => {
    const { id, children, ...rest } = node;
  
    // Initialize the current node in the flat map
    flatMap[id] = {
      id,
      ...rest,
      parents: [...parentIds],
      children: children.map(child => child.id)
    };
  
    // Add current node's ID to the ancestor chain for its children
    for (const child of children) {
      flattenTree(child, [...parentIds, id], flatMap);
  
      // Add this child's id to all its ancestors' children arrays
      for (const ancestorId of parentIds) {
        if (!flatMap[ancestorId].children.includes(child.id)) {
          flatMap[ancestorId].children.push(child.id);
        }
      }
    }
  
    return flatMap;
  }

export default flattenTree