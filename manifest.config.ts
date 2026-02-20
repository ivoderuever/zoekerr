import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: 'Zoekerr',
  version: pkg.version,
  icons: {
    48: 'logo.png', 
  },
  action: {
    default_icon: {
      48: 'logo.png',
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