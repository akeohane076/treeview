import React, { useCallback, useMemo, useState } from 'react'

import { TreeContext } from './TreeContext'
import { defaultState } from './TreeContext'
import { markPass } from '../helpers/markPass'
import { markFail } from '../helpers/markFail'

import type { TreeProviderProps, FlatMap, TreeNode } from '../types/types'

const TreeProvider = (props: TreeProviderProps) => {
    const { children } = props

    const {
        savedState: defaultSavedState,
        workingState: defaultWorkingState,
    } = defaultState

    const [savedState, setSavedState] = useState(defaultSavedState)
    const [workingState, setWorkingState] = useState(defaultWorkingState)
    const [isLoading, setIsLoading] = useState(true)

    const setSavedStateCallback = useCallback((payload: TreeNode) => {
        console.log(payload)
        setSavedState(payload)
    }, [])

    const setWorkingStateCallback = useCallback((payload: FlatMap) => {
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

    const contextValue = useMemo(() => ({
        savedState,
        workingState,
        setSavedState: setSavedStateCallback,
        setWorkingState: setWorkingStateCallback,
        setIsLoading: setIsLoadingCallback,
        isLoading,
        handlePass,
        handleFail
    }), [
        savedState,
        workingState,
        setSavedStateCallback,
        setWorkingStateCallback,
        setIsLoadingCallback,
        isLoading,
        handlePass,
        handleFail
    ])

    return (
        <TreeContext.Provider value={contextValue} >
            {children}
        </TreeContext.Provider>

    )
}

export default TreeProvider