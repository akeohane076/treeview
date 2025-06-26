import type { TreeNode, FlatMap } from '../types/types';

const flattenTree = (
  node: TreeNode,
  parentIds: number[] = [],
  flatMap: FlatMap = {}
): FlatMap => {
  const { id, children, ...rest } = node;

  flatMap[id] = {
    id,
    ...rest,
    parents: [...parentIds],
    children: children.map(child => child.id)
  };

  for (const child of children) {
    flattenTree(child, [...parentIds, id], flatMap);

    for (const ancestorId of parentIds) {
      if (!flatMap[ancestorId].children.includes(child.id)) {
        flatMap[ancestorId].children.push(child.id);
      }
    }
  }

  return flatMap;
};

export default flattenTree;