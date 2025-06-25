
type FlatMap = any
export function markPass(id: number, flatMap: FlatMap): FlatMap {
    const node = flatMap[id];
    if (!node) return flatMap;
  
    // Check if any child is failing
    const hasFailingChild = node.children.some(childId => flatMap[childId]?.status === "FAIL");
    if (hasFailingChild) return flatMap;
  
    const newMap: FlatMap = { ...flatMap };
    newMap[id] = { ...node, status: "PASS", reason: "Content is compliant" };
  
    const parentId = node.parents[node.parents.length - 1];
    if (!parentId) return newMap;
  
    const parent = flatMap[parentId];
    if (!parent || parent.type === "ROOT") return newMap;
  
    const allSiblingsAreNotFail = parent.children.every(
      siblingId => newMap[siblingId]?.status !== "FAIL"
    );
  
    if (allSiblingsAreNotFail) {
      return markPass(parentId, newMap);
    }
  
    return newMap;
  }