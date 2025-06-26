import React from 'react';
import { TreeView as RSTreeView, View } from '@adobe/react-spectrum';
import useTreeProvider from '../../hooks/useTreeProvider/useTreeProvider';
import type { TreeViewProps, TreeNode } from '../../types/types';

import TreeViewItem from '../TreeViewItem/TreeViewItem';

const TreeView = (props: TreeViewProps) => {
  const { items } = props;

  const {
    workingState,
    isLoading,
    error,
  } = useTreeProvider();

  if (error) {
    return <p>{error}</p>;
  }

  if (!items || !workingState || isLoading) {
    return <p>loading</p>;
  }

  return (
    <View padding="size-100" width="100%">
      <RSTreeView<TreeNode>
        items={[items]}
        defaultExpandedKeys={['Root Node']}
      >
        {(item: TreeNode) => (
          <TreeViewItem
            key={item.id}
            id={item.id}
            childItems={item.children}
            textValue={item.name}
            name={item.name}
          />
        )}
      </RSTreeView>
    </View>
  );
};

export default TreeView;
