<template>
  <figure
    class="web-bookmark-card"
    :class="bookmarkClass"
  >
    <a
      v-if="!isLoading"
      class="web-bookmark-wrapper glass-card"
      :href="metaData.url"
      :style="dynamicStyle"
      target="_blank"
    >
      <div class="web-bookmark-content" :class="{ 'has-qrcode': qrcode }">
        <div class="web-bookmark-content--typogragh">
          <div class="web-bookmark-content--box web-bookmark-content__title">
            <span>{{ metaData.title }}</span>
          </div>
          <div class="web-bookmark-content--box web-bookmark-content__desc">
            {{ metaData.description }}
          </div>
          <div class="web-bookmark-content--box web-bookmark-content__meta">
            <div class="web-bookmark-meta">
              <img v-if="metaData.logo" :src="metaData.logo" class="web-bookmark-meta__icon">
              <span class="web-bookmark-meta__author">
                {{ metaData.author || metaData.publisher || metaData.url }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="qrcode && metaData.url" class="web-bookmark-content--qrcode">
          <FancyQRCode :url="metaData.url" class="web-bookmark-qrcode" />
        </div>
      </div>
      <div v-if="metaData.image" class="web-bookmark-thumbnail">
        <img :src="metaData.image">
      </div>
    </a>
    <div
      v-else
      class="text-center p-20 flex flex-col justify-center items-center glass-card"
    >
      <svg
        class="anim-rotate box-content text-gray-700"
        width="32"
        height="32"
        viewBox="0 0 16 16"
        fill="none"
        data-view-component="true"
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke="currentColor"
          stroke-opacity="0.25"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
        ></circle>
        <path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke"></path>
      </svg>
      <span class="mt-4 text-gray-800 dark:text-gray-400">Loading Visualization Bookmark...</span>
    </div>
  </figure>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import FancyQRCode from './FancyQRCode.vue'

const API_PREFIX = 'https://metafy.vercel.app/api?url='

type MetaData = {
  title: string
  description: string
  url: string
  image: string
  logo: string
  author: string
  publisher: string
}

const props = defineProps({
  /**
   * find the special alias and render it
   */
  url: { type: String, require: true, default: '' },
  /**
   * control the bookmark size
   */
  size: { type: String, default: 'medium' },
  /**
   * the image render position of bookmark
   */
  cover: { type: String, default: 'right' },
  /**
   * when to show card shadows
   */
  shadow: { type: String, default: 'always' },
  /**
   * whether bookmark card is horizontal or vertical
   */
  horizontal: { type: Boolean, default: false },
  /**
   * whether bookmark card is show qrcode
   */
  qrcode: { type: Boolean, default: true },
})

// const palette = ref('#3eaf7c')
const isLoading = ref(false)

const metaData = reactive<MetaData>({
  title: '',
  description: '',
  url: '',
  image: '',
  logo: '',
  author: '',
  publisher: '',
})

const init = async() => {
  // const fakeUrl = 'https://github.com/xiaoluoboding/vitesse-modernized-chrome-ext'
  isLoading.value = true
  const res = await axios.get(`${API_PREFIX}${props.url}`)
  metaData.title = res.data.title
  metaData.description = res.data.description
  metaData.url = props.url as string
  metaData.image = res.data.image
  metaData.logo = res.data.logo
  metaData.author = res.data.author
  metaData.publisher = res.data.publisher
  isLoading.value = false
}

const bookmarkClass = computed(() => {
  return {
    'web-bookmark-card--large': props.size === 'large',
    'web-bookmark-card--medium': props.size === 'medium',
    'web-bookmark-card--small': props.size === 'small',
    'web-bookmark-card--horizontal': props.horizontal,
    'is-always-shadow': props.shadow === 'always',
    'is-hover-shadow': props.shadow === 'hover',
    'is-never-shadow': props.shadow === 'never',
  }
})

const dynamicStyle = computed(() => {
  return {
    'flex-direction': props.cover === 'right'
      ? 'row-reverse'
      : 'row',
  }
})

onMounted(async() => {
  await init()
})

watch(
  () => props.url,
  async(newVal) => {
    await init()
  },
  { deep: true },
)
</script>

<style lang="scss" scoped>
.web-bookmark-card {
  @apply relative rounded-md overflow-hidden;
  // @apply border border-gray-200 dark:border-gray-700;
  @apply shadow-xl shadow-gray-500 dark:shadow-gray-700;
  @apply text-left;
  @apply w-[480px] mb-8;
  transition: all .3s ease-out;
  .web-bookmark-wrapper {
    font-family: inherit;
    box-shadow: none;
    @apply flex flex-wrap flex-row-reverse;
    @apply text-current;
    @apply no-underline hover:no-underline;
    @apply dark:from-gray-800 dark:to-gray-900;
    transition: all .3s ease-out;
    .web-bookmark-content {
      flex-grow: 999;
      flex-basis: 0;
      @apply relative grid order-1;
      @apply min-w-1/2;
      @apply py-4 px-5;
      &--box {
        @apply items-center;
      }
      &__title {
        @apply line-clamp-1;
        @apply font-semibold;
        @apply text-gray-800 dark:text-white;
      }
      &__desc,
      &__meta {
        @apply mt-3;
      }
      &__desc {
        @apply line-clamp-2;
        @apply text-gray-800 dark:text-gray-400;
      }
      &__meta {
        @apply items-center truncate;
      }
      .web-bookmark-meta {
        @apply flex items-center truncate;
        &__icon {
          @apply inline-block align-text-bottom mr-2;
        }
        &__author {
          @apply truncate;
        }
      }
    }

    .web-bookmark-content.has-qrcode {
      grid-template-columns: 2fr 1fr;
    }

    .web-bookmark-thumbnail {
      flex-basis: 16rem;
      flex-grow: 1;
      @apply relative;
      @apply min-w-1/3 max-h-full h-64;
      img {
        @apply m-0 w-full h-full align-bottom object-cover;
        @apply relative;
      }
    }

    .web-bookmark-qrcode {
      @apply absolute right-0 bottom-0 h-full w-1/3;
    }
  }

  // medium size style
  &.web-bookmark-card--medium {
    .web-bookmark-content {
      &__title {
        @apply text-base;
      }
      &__desc {
        @apply text-sm;
      }
    }
    .web-bookmark-meta {
      &__icon {
        @apply w-4 h-4;
      }
      &__author {
        @apply text-sm;
      }
    }
  }

  &.web-bookmark-card--horizontal {
    @apply w-[720px];
    .web-bookmark-wrapper {
      .web-bookmark-thumbnail {
        @apply h-36;
      }
    }

    // small size style
    &.web-bookmark-card--small {
      .web-bookmark-content {
        @apply py-3 px-4;
        &__title {
          @apply text-sm;
        }
        &__desc {
          @apply text-xs;
        }
      }
      .web-bookmark-meta {
        &__icon {
          @apply w-3.5 h-3.5;
        }
        &__author {
          @apply text-xs;
        }
      }
      .web-bookmark-thumbnail {
        flex-basis: 13.5rem;
        @apply h-30;
      }
    }
  }
}

.anim-rotate {
  animation: rotate-keyframes 1s linear infinite;
}

@keyframes rotate-keyframes {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
