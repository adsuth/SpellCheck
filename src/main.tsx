import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './css/style.css'
import { ChakraProvider } from '@chakra-ui/react'
import { THEME } from './theme.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <ChakraProvider theme={THEME}>
      <App />
    </ChakraProvider>
  </>
)
