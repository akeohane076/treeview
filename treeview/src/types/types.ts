import type React from "react";

export type TreeNodeStatus = 'PASS' | 'FAIL' | null;

export type Status = "PASS" | "FAIL" | null;

export const PASS_REASON = "Content is compliant";
export const FAIL_REASON = "Content is not compliant";

export interface TreeNode {
    id: number;
    type: string;
    name: string;
    status: "PASS" | "FAIL" | null;
    reason: string | null;
    children: TreeNode[];
}

export type FlatNode = {
    id: number;
    type: string;
    name: string;
    status: "PASS" | "FAIL" | null;
    reason: string | null;
    parents: number[];   // List of ancestor IDs from root down to immediate parent
    children: number[];  // List of immediate child IDs
};

export type FlatMap = Record<number, FlatNode>;

export interface TreeState {
  savedState: TreeNode[];
  workingState: TreeNode[];
}

export interface TreeViewProps {
  items: TreeNode
}

export interface TreeContextType {
  workingState: FlatMap | null;
  isLoading: boolean;
  data: TreeNode | null;
  save: () => void;
  revert: () => void;
  error: string | null;
  setWorkingState: (state: FlatMap) => void;
  setIsLoading: (loading: boolean) => void;
  handlePass: (id: number) => void;
  handleFail: (id: number) => void;
}

export interface TreeProviderProps {
  children?: React.ReactNode 
}

export interface TreeViewItemProps {
    id: number;
    name: string;
    childItems?: TreeNode[]
    children?: React.ReactNode
    textValue: string
}