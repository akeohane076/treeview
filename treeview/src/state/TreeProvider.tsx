import React, { useCallback, useMemo, useState, useEffect } from 'react'

import flattenTree from '../helpers/flattenArray'
import makeTree from '../helpers/makeTree'

import api from '../api'

import { TreeContext } from './TreeContext'
import { defaultState } from './TreeContext'
import { markPass } from '../helpers/markPass'
import { markFail } from '../helpers/markFail'

import type { TreeProviderProps, FlatMap, TreeNode } from '../types/types'

const TreeProvider = (props: TreeProviderProps) => {
    const { children } = props

    const {
        workingState: defaultWorkingState,
    } = defaultState
    const [data, setData] = useState<TreeNode | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [workingState, setWorkingState] = useState(defaultWorkingState)
    const [savedState, setSavedState] = useState(defaultWorkingState)
    const [isLoading, setIsLoading] = useState(true)

    const setWorkingStateCallback = useCallback((payload: FlatMap) => {
        console.log(payload)
        setWorkingState(payload)
    }, [])

    const setIsLoadingCallback = useCallback((payload: boolean) => {
        setIsLoading(payload)
    }, [])

    const handlePass = (id: number) => {
        setWorkingState(prev => markPass(id, prev));
    };
    
    const handleFail = (id: number) => {
        setWorkingState(prev => markFail(id, prev));
    };

    const save = useCallback(() => {
    // You could send flattenToTree(workingState) to the backend here if needed
        const flat = makeTree(workingState)
        setSavedState(workingState);
        setData(flat)
    }, [workingState]);
    
    const revert = useCallback(() => {
        setWorkingState(savedState);
    }, [savedState]);

    const run = useCallback(async () => {
        setIsLoading(true);
        setError(null);
    
        try {
          const result = await api.get();
          const flat = flattenTree(result)
          setWorkingState(flat);
          setSavedState(flat);
          setData(result);
          console.log(result)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      }, []);
    
      useEffect(() => {
        run(); // automatically call api.get() on mount
      }, [run]);

    const contextValue = useMemo(() => ({
        workingState,
        setWorkingState: setWorkingStateCallback,
        setIsLoading: setIsLoadingCallback,
        isLoading,
        handlePass,
        handleFail,
        data,
        save,
        revert,
    }), [
        workingState,
        data,
        setWorkingStateCallback,
        setIsLoadingCallback,
        isLoading,
        handlePass,
        handleFail,
        save,
        revert,
    ])

    return (
        <TreeContext.Provider value={contextValue} >
            {children}
        </TreeContext.Provider>

    )
}

export default TreeProvider