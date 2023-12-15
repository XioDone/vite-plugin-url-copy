import { defineConfig } from 'vite'
import ServerUrlCopy from 'vite-plugin-url-copy'

export default defineConfig({
  plugins: [
    ServerUrlCopy({
      mode: 'local',
      custom: '',
      debug: false,
      disabled: false,
      qrcode: true,
    }),
  ],
  server: {
    host: true,
  },
  preview: {
    host: true,
  },
})
