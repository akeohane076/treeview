import React, { type Key } from 'react'

import Cancel from '@spectrum-icons/workflow/Cancel';
import Approve from '@spectrum-icons/workflow/Checkmark';
import Pass from '@spectrum-icons/workflow/CheckmarkCircle';
import Fail from '@spectrum-icons/workflow/Alert';

import {
    ActionGroup,
    Item,
    TreeViewItem as RSTreeViewItem,
    TreeViewItemContent,
    Collection,
    Text
} from '@adobe/react-spectrum'

import useTreeProvider from '../../hooks/useTreeProvider/useTreeProvider';
import type { TreeNode, TreeViewItemProps } from '../../types/types';

const TreeViewItem = (props: TreeViewItemProps) => {

  const { handleFail, workingState, handlePass } = useTreeProvider()
  const onAction = (k: Key) => {
    if (k === "cancel") {
      handleFail(props.id)
    }
    else if(k === 'approve'){
      handlePass(props.id)
    }
  }
  const isPassing = workingState[props.id].status === "PASS"
  const isRoot = props.name === "Root Node"
  const disabledKeys = isPassing ? 'approve' : 'cancel'
  const hasChildren = props.childItems?.length > 0
    return (
        <>
        <RSTreeViewItem id={props.name} textValue={props.name} key={props.name}>
          <TreeViewItemContent>
            {!isRoot && (isPassing? <Pass color='positive'/> : <Fail color="negative"/>)}
            <Text>{workingState[props.id].status} {props.name}</Text>
            {!hasChildren && 
            <ActionGroup
              onAction={key => onAction(key)}
              disabledKeys={[disabledKeys]}
            >
              <Item key="approve" textValue="approve">
                <Approve />
              </Item>
              <Item key="cancel" textValue="cancel">
                <Cancel/>
              </Item>
            </ActionGroup>}
          </TreeViewItemContent>
          
          <Collection items={props.childItems}>
            {(item: TreeNode) => (
              <TreeViewItem
                id={item.id}
                childItems={item.children}
                textValue={item.name}
                name={item.name}
              >
                {item.name}
              </TreeViewItem>
            )}
          </Collection>
        </RSTreeViewItem>
      </>
    )
}

export default TreeViewItem