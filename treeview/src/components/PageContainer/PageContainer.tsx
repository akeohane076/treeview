import React, { useEffect } from 'react'
import { Flex, View } from '@adobe/react-spectrum'
import useTreeProvider from '../../hooks/useTreeProvider/useTreeProvider'
import { useAppState } from '../../hooks/useAppState/useAppState'
import TreeView from '../TreeView/TreeView'
import ButtonBar from '../ButtonBar/ButtonBar'

const PageContainer = () => {
    const {
        savedState,
        workingState,
        setWorkingState,
        setSavedState,
        isLoading,
        setIsLoading,
    } = useTreeProvider()

    const { data, loading, error, refresh, flatData } = useAppState();

    useEffect(() => {
        setWorkingState(flatData)
        setSavedState(data)
        setIsLoading(false)
    }, [data, flatData])

    useEffect(() => {
        console.log(workingState)
    }, [workingState])

    useEffect(() => {
        console.log(savedState)
    }, [savedState])

    if (isLoading) {
        return <p>loading downnnnnnnn</p>
    }

    return (
        <Flex direction='column' flexGrow={1} height="100vh">
            <Flex width='500px' alignContent="center" alignItems='center' justifyContent="center">
                <TreeView items={savedState} />
            </Flex>
            <ButtonBar />
        </Flex>
    )
}

export default PageContainer