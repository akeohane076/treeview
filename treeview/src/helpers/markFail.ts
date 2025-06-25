export function markFail(id: number, flatMap: FlatMap): FlatMap {
    const node = flatMap[id];
    if (!node) return flatMap;
  
    const newMap: FlatMap = { ...flatMap };
    newMap[id] = { ...node, status: "FAIL", reason: "Content is not compliant" };
  
    // Set all ancestors to FAIL (except root)
    for (let i = node.parents.length - 1; i >= 0; i--) {
      const parentId = node.parents[i];
      const parent = newMap[parentId];
      if (!parent || parent.type === "ROOT") continue;
  
      newMap[parentId] = {
        ...parent,
        status: "FAIL",
        reason: "Content is not compliant"
      };
    }
  
    return newMap;
  }