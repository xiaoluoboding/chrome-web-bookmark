import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import I18n from '@intlify/vite-plugin-vue-i18n'
import WindiConfig from './windi.config'

const port = parseInt(process.env.PORT || '') || 3309
const r = (...args: string[]) => resolve(__dirname, ...args)

export default defineConfig(({ command }) => {
  return {
    root: r('views'),
    base: command === 'serve' ? `http://localhost:${port}/` : undefined,
    resolve: {
      alias: {
        '~/': `${r('views')}/`,
      },
    },
    server: {
      port,
      hmr: {
        host: 'localhost',
      },
    },
    build: {
      outDir: r('extension/dist'),
      emptyOutDir: false,
      rollupOptions: {
        input: {
          popup: r('views/popup/index.html'),
        },
      },
    },
    plugins: [
      Vue(),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        dirs: [r('views/components')],
        // auto import icons
        resolvers: [
          IconsResolver({
            prefix: '',
          }),
        ],
      }),

      // https://github.com/antfu/unplugin-icons
      Icons(),

      // https://windicss.org/integrations/vite.html
      WindiCSS({
        config: WindiConfig,
      }),

      // https://github.com/intlify/vite-plugin-vue-i18n
      I18n({
        include: [resolve(__dirname, 'views/locales/**')],
      }),

      // rewrite assets to use relative path
      {
        name: 'assets-rewrite',
        enforce: 'post',
        apply: 'build',
        transformIndexHtml(html) {
          return html.replace(/"\/assets\//g, '"../assets/')
        },
      },
    ],

    optimizeDeps: {
      include: [
        'vue',
        '@vueuse/core',
      ],
      exclude: [
        'vue-demi',
      ],
    },
  }
})
