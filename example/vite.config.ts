import { defineConfig } from 'vite'
import ServerUrlCopy from 'vite-plugin-url-copy'

export default defineConfig({
  plugins: [
    ServerUrlCopy({
      copy: {
        mode: 'local',
        custom: '',
        disabled: false,
      },
      qrcode: {
        custom: URL => `${URL}?query=hi`,
        disabled: false,
      },
      disabled: false,
      debug: false,
    }),
  ],
  server: {
    host: true,
  },
  preview: {
    host: true,
  },
})
