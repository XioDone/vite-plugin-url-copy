<h1 align="center">
vite-plugin-url-copy
</h1>

<p align="center">
<a href="https://www.npmjs.com/package/vite-plugin-url-copy" target="_blank"><img src="https://img.shields.io/npm/v/vite-plugin-url-copy.svg?style=flat&colorA=18181B&colorB=28CF8D" alt="Version"></a>
</p>

<p align="center">⚡️ Auto copy the vite server url when dev or preview</p>

> [!IMPORTANT]
> Recommended minimum vite version is v4.

## Usage

### Install

```bash
pnpm i -D vite-plugin-url-copy
```

Add plugin to your `vite.config.ts`

```ts
import ServerUrlCopy from 'vite-plugin-url-copy'

export default defineConfig({
  plugins: [ServerUrlCopy()],
  server: {
    host: true,
  },
  preview: {
    host: true,
  },
})
```

## Configuration

```ts
ServerUrlCopy({
  // 'local' | 'network', default 'local'
  mode: 'local',
  // Custom any string to copy when the server start, It will overwrite the server URL.
  custom: '',
  // Generate network QR code, default false
  qrcode: false,
  // Log config info, default false
  debug: false,
  // Disable plugin, default false
  disabled: false,
})
```

Network may need to enable host

```ts
// package.json
{
  "scripts": {
    "dev": "vite --host"
  }
}

// or vite.config.ts
export default defineConfig({
  plugins: [ServerUrlCopy()],
  server: {
    host: true,
  },
})
```

## License

[MIT](./LICENSE) License © 2023 [XioDone](https://github.com/XioDone)
