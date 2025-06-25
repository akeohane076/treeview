import type { FlatMap, TreeNode } from '../types/types';

export default function makeTree(flatMap: FlatMap): TreeNode {
  const nodes: Record<number, TreeNode> = {};

  // Step 1: Clone all nodes into a new object, but clear their children arrays
  for (const id in flatMap) {
    const node = flatMap[id];
    nodes[node.id] = {
      ...node,
      children: [] // we'll rebuild this
    };
  }

  let root: TreeNode | null = null;

  // Step 2: Reattach children to their parent nodes
  for (const id in nodes) {
    const node = nodes[id];
    const parentId = flatMap[node.id].parents.slice(-1)[0]; // last parent in the chain

    if (parentId != null && nodes[parentId]) {
      nodes[parentId].children.push(node);
    } else {
      root = node; // node has no parent, so it's the root
    }
  }

  if (!root) {
    throw new Error('No root node found while reconstructing tree.');
  }

  return root;
}