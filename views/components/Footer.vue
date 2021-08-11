<template>
  <nav class="text-xl mt-6">
    <slot />
    <button class="icon-btn mx-2 !outline-none" :title="$t('button.toggle_dark')" @click="e => toggleDark()">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <a class="icon-btn mx-2" @click="openOptionsPage">
      <carbon-settings />
    </a>

    <!-- <a class="icon-btn mx-2" :title="$t('button.toggle_langs')" @click="toggleLocales">
      <carbon-language />
    </a> -->

    <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/xiaoluoboding/chrome-web-bookmark" target="_blank" title="GitHub">
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
