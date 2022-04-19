<template>
  <main
    class="min-h-[36rem] grid place-content-center px-6 py-4 transform-gpu transition-all duration-200 ease-linear"
    :class="[{'column': state.isHorizontal}, state.isHorizontal ? 'min-w-screen-md' : 'min-w-screen-sm', state.gradientColor]"
  >
    <div
      id="bookmark"
      class="overflow-hidden bg-black shadow-xl relative transform-gpu transition-all duration-200 ease-linear rounded-lg pointer-events-none"
      :class="state.gradientColor"
    >
      <VisualBookmark
        v-if="state.currentUrl"
        :url="state.currentUrl"
        :horizontal="state.isHorizontal"
        :qrcode="state.showQRCode"
      />
    </div>

    <Footer class="fixed bottom-6 left-0 flex justify-center w-full">
      <a class="btn-icon" :title="$t('button.toggle_layout')" @click="toggleColumn">
        <mdi-dock-right v-if="state.isHorizontal" />
        <mdi-dock-top v-else />
      </a>
      <a class="btn-icon" :title="$t('button.show_qrcode')" @click="toggleQRCode">
        <mdi:qrcode-plus v-if="state.showQRCode" />
        <mdi:qrcode-remove v-else />
      </a>
      <a v-if="!state.isCopying" class="btn-icon" :title="$t('button.copy_image')" @click="handleCopyImage">
        <carbon:image-copy />
      </a>
      <a v-else class="btn-icon text-sm" :title="$t('button.close')">
        <SpinIcon class="w-6 h-6" />
      </a>
    </Footer>

    <template v-if="state.notifyList.length > 0">
      <Notify
        placement="TOP"
        :notify-list="state.notifyList"
        @close="removeNotify"
      />
    </template>
  </main>
</template>

<script lang="ts" setup>
/* eslint-disable no-console */
import { reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  copyBlobToClipboard,
} from 'copy-image-clipboard'

import { sharedLink } from '~/logic/storage'
import { useRetinaImage } from '~/composable/useRetinalImage'

import Notify from '~/components/Notify.vue'
import type { NotifyItem } from '~/types'
import { sample } from '~/utils'

type LocalState = {
  notifyList: NotifyItem[]
  currentUrl: string
  isHorizontal: boolean
  showQRCode: boolean
  isCopying: boolean
  gradientColor: string
}

const { t } = useI18n()

const state = reactive<LocalState>({
  currentUrl: '',
  isHorizontal: false,
  showQRCode: true,
  notifyList: [],
  isCopying: false,
  gradientColor: '',
})

const getGradientColor = () => {
  const ANGLE_LIST = ['tl', 'tr', 'bl', 'br']
  const angle = sample(ANGLE_LIST)

  return sample([
    {
      name: 'OCEANIC',
      class: `bg-gradient-to-${angle} from-green-300 via-blue-500 to-purple-600`,
    },
    {
      name: 'HYPER',
      class: `bg-gradient-to-${angle} from-pink-500 via-red-500 to-yellow-500`,
    },
    {
      name: 'COTTON CANDY',
      class: `bg-gradient-to-${angle} from-pink-300 via-purple-300 to-indigo-400`,
    },
    {
      name: 'SUNSET',
      class: `bg-gradient-to-${angle} from-indigo-200 via-red-200 to-yellow-100`,
    },
    {
      name: 'PEACHY',
      class: `bg-gradient-to-${angle} from-red-200 via-red-300 to-yellow-200`,
    },
    {
      name: 'POWERPUFF',
      class: `bg-gradient-to-${angle} from-sky-400 via-rose-400 to-lime-400`,
    },
    {
      name: 'GOTHAM',
      class: `bg-gradient-to-${angle} from-gray-700 via-gray-900 to-black`,
    },
    {
      name: 'SPACE',
      class: `bg-gradient-to-${angle} from-gray-900 to-gray-600`,
    },
    {
      name: 'GUNMETAL',
      class: `bg-gradient-to-${angle} from-gray-200 via-gray-400 to-gray-600`,
    },
    {
      name: 'MIDNIGHT',
      class: `bg-gradient-to-${angle} from-blue-700 via-blue-800 to-gray-900`,
    },
    {
      name: 'MESSENGER',
      class: `bg-gradient-to-${angle} from-sky-400 to-blue-500`,
    },
    {
      name: 'SEA',
      class: `bg-gradient-to-${angle} from-teal-200 to-lime-200`,
    },
  ])
}

const toggleColumn = () => {
  state.isHorizontal = !state.isHorizontal
}
const toggleQRCode = () => {
  state.showQRCode = !state.showQRCode
}

const removeNotify = (item: NotifyItem) => {
  const index = state.notifyList.indexOf(item)
  if (index >= 0)
    state.notifyList.splice(index, 1)
}

const handleCopyImage = async() => {
  state.isCopying = true

  const bookmarkEl = document.getElementById('bookmark') as HTMLImageElement
  let timer: any = null

  try {
    const { imageBlob } = await useRetinaImage(bookmarkEl)

    const newNotify: NotifyItem = {
      style: 'SUCCESS',
      title: t('popup.notify_image_copied'),
    }

    state.notifyList.push(newNotify)

    if (timer)
      clearTimeout(timer)

    timer = setTimeout(
      () => {
        removeNotify(newNotify)
      },
      3333,
    )
    state.isCopying = false
    return copyBlobToClipboard(imageBlob.value)
  }
  catch (error) {
    state.isCopying = false
    console.log(error)
  }
}

chrome.tabs.query({
  active: true,
  currentWindow: true,
}, (tabs) => {
  const currentTab = tabs[0]
  state.currentUrl = currentTab.url as string
  sharedLink.value = state.currentUrl
})

onMounted(() => {
  const gradientColor = getGradientColor()
  state.gradientColor = gradientColor.class
})
</script>
