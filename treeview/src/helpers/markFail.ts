import type { FlatMap, FlatNode } from '../types/types';

export function markFail(id: number, flatMap: FlatMap): FlatMap {
  const node: FlatNode | undefined = flatMap[id];
  if (!node) return flatMap;

  const newMap: FlatMap = { ...flatMap };

  // Mark the current node as FAIL
  newMap[id] = {
    ...node,
    status: 'FAIL',
    reason: 'Content is not compliant',
  };

  // Propagate FAIL up to ancestors (excluding ROOT)
  for (let i = node.parents.length - 1; i >= 0; i--) {
    const parentId = node.parents[i];
    const parent: FlatNode | undefined = newMap[parentId];
    if (!parent || parent.type === 'ROOT') continue;

    newMap[parentId] = {
      ...parent,
      status: 'FAIL',
      reason: 'Content is not compliant',
    };
  }

  return newMap;
}
