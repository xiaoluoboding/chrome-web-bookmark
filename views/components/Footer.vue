<template>
  <nav class="text-xl space-x-1">
    <slot />
    <a class="btn-icon !outline-none" href="#" :title="$t('button.toggle_dark')" @click="e => toggleDark()">
      <carbon:moon v-if="isDark" />
      <carbon:sun v-else />
    </a>

    <a class="btn-icon" :href="bookmarkUrl" target="_blank" title="Custom design visual web bookmark">
      <carbon:settings />
    </a>

    <a class="btn-icon" rel="noreferrer" href="https://github.com/xiaoluoboding/chrome-web-bookmark" target="_blank" title="GitHub">
      <carbon-logo-github />
    </a>
  </nav>
</template>

<script setup lang="ts">
import { isDark, toggleDark } from '~/logic'
import { sharedLink } from '~/logic/storage'

const HOST = 'https://bookmark.style'

const bookmarkUrl = computed(() => {
  const url = sharedLink.value
  return url ? `${HOST}/?url=${encodeURIComponent(url)}` : HOST
})
</script>
