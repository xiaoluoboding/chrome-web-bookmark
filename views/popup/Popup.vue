<template>
  <main
    class="min-h-[36rem] grid place-content-center px-6 py-4 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 transform-gpu transition-all duration-200 ease-linear"
    :class="[{'column': state.isHorizontal}, state.isHorizontal ? 'min-w-screen-md' : 'min-w-screen-sm']"
    text="white"
  >
    <div
      id="bookmark"
      class="overflow-hidden shadow-xl relative transform-gpu transition-all duration-200 ease-linear rounded-lg pointer-events-none"
    >
      <VisualBookmark
        v-if="state.currentUrl"
        ref="bookmarkRef"
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
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  copyBlobToClipboard,
} from 'copy-image-clipboard'

import { sharedLink } from '~/logic/storage'
import { useRetinaImage } from '~/composable/useRetinalImage'

import Notify from '~/components/Notify.vue'
import type { NotifyItem } from '~/types'

type LocalState = {
  notifyList: NotifyItem[]
  currentUrl: string
  isHorizontal: boolean
  showQRCode: boolean
  isCopying: boolean
}

const { t } = useI18n()

const state = reactive<LocalState>({
  currentUrl: '',
  isHorizontal: false,
  showQRCode: true,
  notifyList: [],
  isCopying: false,
})
const bookmarkRef = ref()

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
</script>
