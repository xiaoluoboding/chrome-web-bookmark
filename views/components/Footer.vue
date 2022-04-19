<template>
  <nav class="text-xl space-x-1">
    <slot />
    <a class="btn-icon !outline-none" href="#" :title="$t('button.toggle_dark')" @click="e => toggleDark()">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </a>

    <a class="btn-icon" @click="openOptionsPage">
      <carbon-settings />
    </a>

    <!-- <a class="btn-icon mx-2" :title="$t('button.toggle_langs')" @click="toggleLocales">
      <carbon-language />
    </a> -->

    <a class="btn-icon" rel="noreferrer" href="https://github.com/xiaoluoboding/chrome-web-bookmark" target="_blank" title="GitHub">
      <carbon-logo-github />
    </a>
  </nav>
</template>

<script setup lang="ts">
// import { useI18n } from 'vue-i18n'
import { isDark, toggleDark } from '~/logic'

// const { availableLocales, locale } = useI18n()

function openOptionsPage() {
  chrome.runtime.openOptionsPage()
}

// const toggleLocales = () => {
//   // change to some real logic
//   const locales = availableLocales
//   locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
// }
</script>
