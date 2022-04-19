import type { Manifest } from 'webextension-polyfill-ts'
import pkg from '../package.json'
import { isDev, port } from '../scripts/utils'

export async function getManifest(): Promise<Manifest.WebExtensionManifest> {
  // update this file to update this manifest.json
  // can also be conditional based on your need
  return {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    action: {
      default_icon: './assets/favicon.png',
      default_popup: './popup/index.html',
    },
    background: {
      service_worker: 'background.js',
    },
    icons: {
      16: './assets/favicon.png',
      48: './assets/favicon.png',
      128: './assets/favicon.png',
    },
    permissions: [
      'activeTab',
    ],
    // this is required on dev for Vite script to load
    content_security_policy: {
      extension_pages: isDev
        ? `script-src \'self\' http://localhost:${port}; object-src \'self\'`
        : undefined,
    },
  }
}
