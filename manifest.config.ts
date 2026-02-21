import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: 'Zoekerr',
  version: pkg.version,
  icons: {
    16: 'logo-16.png',
    32: 'logo-32.png',
    48: 'logo-48.png',
    128: 'logo-128.png',
  },
  action: {
    default_icon: {
      16: 'logo-16.png',
      32: 'logo-32.png',
      48: 'logo-48.png',
      128: 'logo-128.png',
    },
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module'
  },
  content_scripts: [{
    js: ['src/content/main.ts'],
    matches: ['http://*/*', 'https://*/*'], 
  }],
  commands: {
    'toggle-search': {
      suggested_key: {
        default: 'Ctrl+Shift+F',
        mac: 'Command+Shift+F'
      },
      description: 'Toggle Zoekerr Search'
    }
  },
})