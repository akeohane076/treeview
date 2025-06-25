import { Flex, Button, View } from '@adobe/react-spectrum'
import React from 'react'

const ButtonBar = props => {
    return (
        <View padding={'size-400'} marginTop="auto" marginBottom='0px'>
            <Flex  gap="size-200" >
                <Button variant="accent">Save</Button>
                <Button variant='negative'>Cancel</Button>
            </Flex>
        </View>
    )
}

export default ButtonBar