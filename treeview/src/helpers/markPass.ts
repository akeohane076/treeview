import type { FlatMap, FlatNode } from '../types/types';

export function markPass(id: number, flatMap: FlatMap): FlatMap {
  const node: FlatNode | undefined = flatMap[id];
  if (!node) return flatMap;

  // Check if any child is failing
  const hasFailingChild: boolean = node.children.some(
    (childId: number) => flatMap[childId]?.status === 'FAIL'
  );
  if (hasFailingChild) return flatMap;

  const newMap: FlatMap = { ...flatMap };
  newMap[id] = {
    ...node,
    status: 'PASS',
    reason: 'Content is compliant',
  };

  const parentId: number | undefined = node.parents[node.parents.length - 1];
  if (parentId === undefined) return newMap;

  const parent: FlatNode | undefined = flatMap[parentId];
  if (!parent || parent.type === 'ROOT') return newMap;

  const allSiblingsAreNotFail: boolean = parent.children.every(
    (siblingId: number) => newMap[siblingId]?.status !== 'FAIL'
  );

  if (allSiblingsAreNotFail) {
    return markPass(parentId, newMap);
  }

  return newMap;
}
