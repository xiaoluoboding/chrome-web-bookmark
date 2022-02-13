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
    />

    <Footer class="text-center">
      <a class="icon-btn text-xl mx-2 inline-block" :title="$t('button.toggle_layout')" @click="toggleColumn">
        <mdi-dock-right v-if="isHorizontal" />
        <mdi-dock-top v-else />
      </a>
      <a class="icon-btn text-xl mx-2 inline-block" title="Copy Image to Clipboard!" @click="handleCopyImage">
        <mdi:image-area />
      </a>
    </Footer>
  </main>
</template>

<script lang="ts" setup>
/* eslint-disable no-console */
import { ref } from 'vue'
import domtoimage from 'dom-to-image'
import {
  copyBlobToClipboard,
} from 'copy-image-clipboard'

import { sharedLink } from '~/logic/storage'

const currentUrl = ref('')
const isHorizontal = ref(false)
const bookmarkRef = ref()
const toggleColumn = () => {
  isHorizontal.value = !isHorizontal.value
}

const handleCopyImage = async() => {
  const bookmarkEl = document.getElementById('bookmark') as HTMLImageElement

  try {
    const blob = await domtoimage.toBlob(bookmarkEl)

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
