import React, { useEffect } from 'react'
import { Flex, View } from '@adobe/react-spectrum'
import useTreeProvider from '../../hooks/useTreeProvider/useTreeProvider'
import TreeView from '../TreeView/TreeView'
import ButtonBar from '../ButtonBar/ButtonBar'

const PageContainer = () => {
    const {
        workingState,
        isLoading,
        data,
    } = useTreeProvider()

    useEffect(() => {
        console.log(workingState)
    }, [workingState])

    useEffect(() => {
        console.log(data)
    }, [data])

    if (isLoading) {
        return <p>loading</p>
    }

    return (
        <Flex direction='column' flexGrow={1} height="100vh">
            <Flex width='500px' alignContent="center" alignItems='center' justifyContent="center">
                <TreeView items={data}/>
            </Flex>
            <ButtonBar />
        </Flex>
    )
}

export default PageContainer