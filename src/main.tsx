import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "katex/dist/katex.min.css"
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/routes";
import Providers from "./app-providers";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
)
