import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // Real build timestamp — used for the "Last updated" note in the
    // footer so it reflects the actual deploy date, not a hardcoded string.
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
})
