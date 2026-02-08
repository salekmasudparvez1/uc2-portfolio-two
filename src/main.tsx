import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import './style/font.css'
import App from './Portfolio.tsx'
import Provider from './providers/Provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>

  </StrictMode>,
)
