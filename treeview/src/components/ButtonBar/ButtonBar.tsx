import { Flex, Button, View } from '@adobe/react-spectrum'
import React from 'react'

import useTreeProvider from '../../hooks/useTreeProvider/useTreeProvider'

const ButtonBar = props => {

    const {save, revert} = useTreeProvider()
    return (
        <View padding={'size-400'} marginTop="auto" marginBottom='0px'>
            <Flex  gap="size-200" >
                <Button onPress={save} variant="accent">Save</Button>
                <Button onPress={revert} variant='negative'>Cancel</Button>
            </Flex>
        </View>
    )
}

export default ButtonBar