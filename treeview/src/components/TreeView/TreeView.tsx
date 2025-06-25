import React from 'react'
import {TreeView as RSTreeView, View} from '@adobe/react-spectrum'
import useTreeProvider from '../../hooks/useTreeProvider/useTreeProvider'

import TreeViewItem from '../TreeViewItem/TreeViewItem'

type MyItem = {
    id: string;
    name: string;
    icon: any;
    childItems?: MyItem[];
  };

const TreeView = props => {

  const {
    workingState,
    isLoading
  } = useTreeProvider()

    if (!props.items || !workingState) {
      return <p>'loading'</p>
    }

    console.log(props.items)
    console.log(workingState)

    
    return (
      <View padding="size-100" width="100%">
        <RSTreeView items={[props.items]} defaultExpandedKeys={['Root Node']} >
          {(item: MyItem) => (
              <TreeViewItem
                id={item.id}
                icon={item.icon}
                childItems={item.children}
                textValue={item.name}
                name={item.name}
              />
          )}
        </RSTreeView>
      </View>
    )
}

export default TreeView
