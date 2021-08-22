<template>
  <main class="container mx-auto text-gray-700 dark:text-gray-200">
    <header class="text-center py-16">
      <h1 class="text-4xl">
        Chrome Web Bookmark
      </h1>
      <p class="text-lg mt-8">
        Turn a link as a visual web bookmark
      </p>
      <p class="text-lg mt-2">
        Just like <strong class="gradient-text">Twitter cards</strong> or <strong class="gradient-text">Notion web bookmark</strong>.
      </p>
    </header>

    <section class="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2">
      <div class="w-full flex justify-center flex-col items-center">
        <section>
          <figcaption class="text-left text-xl pb-4 text-gray-800 dark:text-gray-200">
            Notion Web Bookmark - Right Cover Image
          </figcaption>
          <Bookmark v-if="sharedLink" :url="sharedLink" horizontal />
        </section>
        <section>
          <figcaption class="text-left text-xl pb-4 text-gray-800 dark:text-gray-200">
            Notion Web Bookmark - Left Cover Image
          </figcaption>
          <Bookmark v-if="sharedLink" :url="sharedLink" cover="left" horizontal />
        </section>
        <section>
          <figcaption class="text-left text-xl pb-4 text-gray-800 dark:text-gray-200">
            Notion Web Bookmark - Small Size
          </figcaption>
          <Bookmark v-if="sharedLink" :url="sharedLink" size="small" horizontal />
        </section>
      </div>

      <div class="w-full flex justify-center flex-col items-center">
        <section>
          <figcaption class="text-left text-xl pb-4 text-gray-800 dark:text-gray-200">
            Twitter Like Card
          </figcaption>
          <Bookmark v-if="sharedLink" :url="sharedLink" />
        </section>
      </div>
    </section>

    <footer class="flex flex-col text-center text-md">
      <Footer />

      <p class="mt-4">
        Code with ❤️ & ☕️ By
        <GradientLink to="https://twitter.com/xiaoluoboding">
          @xiaoluoboding
        </GradientLink>
        Ⓒ {{ dayjs().format('YYYY') }}
      </p>
      <p class="mt-2">
        {{ $t('options.powered_by_vite') }} <pixelarticons-zap class="align-middle inline-block" />
      </p>
    </footer>
  </main>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { sharedLink } from '~/logic/storage'
</script>
