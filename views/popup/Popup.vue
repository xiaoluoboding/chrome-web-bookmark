<template>
  <main
    class="p-4"
    :class="{'column': isHorizontal}"
    text="gray-700 dark:gray-200"
  >
    <Bookmark
      v-if="currentUrl"
      id="bookmark"
      ref="bookmarkRef"
      :url="currentUrl"
      :horizontal="isHorizontal"
      :qrcode="showQRCode"
    />

    <Footer class="text-center">
      <a class="icon-btn text-xl mx-2 inline-block" :title="$t('button.toggle_layout')" @click="toggleColumn">
        <mdi-dock-right v-if="isHorizontal" />
        <mdi-dock-top v-else />
      </a>
      <a class="icon-btn text-xl mx-2 inline-block" :title="$t('button.show_qrcode')" @click="toggleQRCode">
        <mdi:qrcode v-if="showQRCode" />
        <mdi:qrcode-scan v-else />
      </a>
      <a class="icon-btn text-xl mx-2 inline-block" :title="$t('button.copy_image')" @click="handleCopyImage">
        <mdi:image-area />
      </a>
    </Footer>

    <template v-if="notifyList.length > 0">
      <Notify
        placement="CENTER"
        :notify-list="notifyList"
        @close="removeNotify"
      />
    </template>
  </main>
</template>

<script lang="ts" setup>
/* eslint-disable no-console */
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import domtoimage from 'dom-to-image'
import {
  copyBlobToClipboard,
} from 'copy-image-clipboard'

import { sharedLink } from '~/logic/storage'

import Notify from '~/components/Notify.vue'
import type { NotifyItem } from '~/components/types'

const { t } = useI18n()
const currentUrl = ref('')
const isHorizontal = ref(false)
const showQRCode = ref(true)
const bookmarkRef = ref()
const notifyList = ref<NotifyItem[]>([])

const toggleColumn = () => {
  isHorizontal.value = !isHorizontal.value
}
const toggleQRCode = () => {
  showQRCode.value = !showQRCode.value
}

const removeNotify = (item: NotifyItem) => {
  const index = notifyList.value.indexOf(item)
  if (index >= 0)
    notifyList.value.splice(index, 1)
}

const handleCopyImage = async() => {
  const bookmarkEl = document.getElementById('bookmark') as HTMLImageElement
  let timer: any = null

  try {
    const blob = await domtoimage.toBlob(bookmarkEl)

    const newNotify: NotifyItem = {
      style: 'SUCCESS',
      title: t('popup.notify_image_copied'),
    }

    notifyList.value.push(newNotify)

    if (timer)
      clearTimeout(timer)

    timer = setTimeout(
      () => {
        removeNotify(newNotify)
      },
      3333,
    )

    return copyBlobToClipboard(blob)
  }
  catch (error) {
    console.log(error)
  }
}

chrome.tabs.query({
  active: true,
  currentWindow: true,
}, (tabs) => {
  const currentTab = tabs[0]
  currentUrl.value = currentTab.url as string
  sharedLink.value = currentUrl.value
})
</script>

<style scoped>
#app {
  height: 100%;
}
</style>
