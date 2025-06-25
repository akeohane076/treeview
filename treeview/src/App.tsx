import React from 'react'
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import TreeProvider from './state/TreeProvider';
import PageContainer from './components/PageContainer/PageContainer';
import "./App.css"

const App = () => {
  return (
    <Provider theme={defaultTheme}>
      <TreeProvider>
        <PageContainer />
      </TreeProvider>
    </Provider>
  )
}

export default App
