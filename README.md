<h1 align="center">
vite-plugin-url-copy
</h1>

<p align="center">
<a href="https://github.com/XioDone/vite-plugin-url-copy" target="_blank"><img alt="Github Badge" src="https://img.shields.io/badge/Star---?logo=github&logoColor=aliceblue&labelColor=18181B&color=61C200"></a>
<a href="https://www.npmjs.com/package/vite-plugin-url-copy" target="_blank"><img src="https://img.shields.io/npm/v/vite-plugin-url-copy.svg?style=flat&colorA=18181B&colorB=28CF8D" alt="Version"></a>
</p>

<p align="center">⚡️ Auto copy the Vite server URL and generate a QR code for easy access during dev or preview.</p>

<p align="center"><img src="example/public/preview.png" width="100%"></p>

##### Features

- 🌟 Ready to use, supports dev and preview mode.
- 💭 Supports copy server URL (local and network types).
- 📱 Supports generate network URL QR code.
- 💡 Customizable characters for copy or generate QR code.
- 😃 Friendly Hot Reload, When the vite server performs a hot restart, the plugin will be reloaded again only after the plugin's configuration or port has changed.

> [!IMPORTANT]
> Recommended minimum vite version is v4.
>
> Vite CJS Node API deprecated: the CJS build of Vite's Node API is deprecated. See https://vitejs.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.
>
> Recommend configuring ESM as the default, CJS build will be deprecated in v2.

## Install

```bash
pnpm i vite-plugin-url-copy -D
```

## Usage

- Configure ESM as default in `package.json`, it's up to you

```json
{
  "type": "module"
}
```

- Add plugin to your `vite.config.ts`

```ts
import ServerUrlCopy from 'vite-plugin-url-copy'

export default defineConfig({
  plugins: [ServerUrlCopy()],
  server: {
    host: true,
  },
  preview: {
    host: true,
  }
})
```

#### !!! QR code is disabled by default and needs to be explicitly enabled

```ts
ServerUrlCopy({
  // QR code using network URL
  qrcode: {
    disabled: false,
  },
})
```

- Run

```bash
pnpm dev

#or

pnpm preview
```

## Configuration

- [Example](./example)
- Refer to the [type definitions](./src/types.ts) for more options

```ts
ServerUrlCopy({
  copy: {
    // 'local' | 'network'
    mode: 'local',
    // Custom string to copy when the server start, It will overwrite the server URL
    // custom?: string | ((URL: string) => string)
    custom: '',
    // Disable Copy
    disabled: false,
    // Custom display color
    color: 'green',
  },
  qrcode: {
    // Custom string for the generate QR code, It will overwrite the server URL
    // custom?: string | ((URL: string) => string)
    custom: '',
    // Disable QRCode
    disabled: true,
    // Custom display color
    color: 'green',
  },
  // Disable plugin
  disabled: false,
  // Log config info
  debug: false,
})
```

Network may need to enable host

```jsonc
// package.json
{
  "scripts": {
    "dev": "vite --host"
  }
}
```

```ts
// or vite.config.ts
export default defineConfig({
  plugins: [ServerUrlCopy()],
  server: {
    host: true,
  },
})
```

## Ending

Hey there! If you enjoy my project, please give me a ⭐️. Thanks!

## License

[MIT](./LICENSE) License © 2023-PRESENT [XioDone](https://github.com/XioDone)
