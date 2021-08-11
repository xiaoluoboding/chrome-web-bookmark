<template>
  <figure
    class="vp-bookmark-card"
    :class="bookmarkClass"
  >
    <a
      v-if="!isLoading"
      class="vp-bookmark-wrapper"
      :href="metaData.url"
      :style="dynamicStyle"
      target="_blank"
    >
      <div class="vp-bookmark-content">
        <div class="vp-bookmark-content--box vp-bookmark-content__title">
          <span>{{ metaData.title }}</span>
        </div>
        <div class="vp-bookmark-content--box vp-bookmark-content__desc">
          {{ metaData.description }}
        </div>
        <div class="vp-bookmark-content--box vp-bookmark-content__meta">
          <div class="vp-bookmark-meta">
            <img v-if="metaData.logo" :src="metaData.logo" class="vp-bookmark-meta__icon">
            <span class="vp-bookmark-meta__author">
              {{ metaData.author || metaData.publisher || metaData.url }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="metaData.image" class="vp-bookmark-thumbnail">
        <img :src="metaData.image">
      </div>
    </a>
    <div
      v-else
      class="text-center p-20 flex flex-col justify-center items-center"
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
      <span class="mt-4 text-gray-800 dark:text-gray-400">Loading Bookmark Meta Data...</span>
    </div>
  </figure>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import axios from 'axios'

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

export default defineComponent({
  name: 'Bookmark',
  props: {
    /**
     * find the special alias and render it
     */
    url: { type: String, require: true },
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
  },
  setup(props) {
    const palette = ref('#3eaf7c')
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
        'vp-bookmark-card--large': props.size === 'large',
        'vp-bookmark-card--medium': props.size === 'medium',
        'vp-bookmark-card--small': props.size === 'small',
        'vp-bookmark-card--horizontal': props.horizontal,
        'is-always-shadow': props.shadow === 'always',
        'is-hover-shadow': props.shadow === 'hover',
        'is-never-shadow': props.shadow === 'never',
      }
    })

    const dynamicStyle = computed(() => {
      return {
        flexDirection: props.cover === 'right'
          ? 'row-reverse'
          : 'row',
      }
    })

    onMounted(init)

    watch(
      () => props.url,
      (newVal) => {
        init()
      },
      { deep: true },
    )

    return {
      palette,
      isLoading,
      metaData,
      bookmarkClass,
      dynamicStyle,
    }
  },
})
</script>

<style lang="scss" scoped>
.vp-bookmark-card {
  @apply relative rounded-md overflow-hidden;
  @apply border border-gray-200 dark:border-gray-700;
  @apply shadow-xl shadow-gray-500 dark:shadow-gray-700;
  @apply text-left;
  @apply w-[480px] mb-8;
  transition: .3s;
  .vp-bookmark-wrapper {
    font-family: inherit;
    box-shadow: none;
    @apply flex flex-wrap flex-row-reverse;
    @apply text-current;
    @apply no-underline hover:no-underline;
    @apply bg-light-50 dark:bg-gray-800;
    .vp-bookmark-content {
      flex-grow: 999;
      flex-basis: 0;
      @apply grid order-1;
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
      .vp-bookmark-meta {
        @apply flex items-center truncate;
        &__icon {
          @apply inline-block align-text-bottom mr-2;
        }
        &__author {
          @apply truncate;
        }
      }
    }

    .vp-bookmark-thumbnail {
      flex-basis: 16rem;
      flex-grow: 1;
      @apply relative;
      @apply min-w-1/3 max-h-full h-64;
      img {
        @apply m-0 w-full h-full align-bottom object-cover;
      }
    }
  }

  &.vp-bookmark-card--medium {
    .vp-bookmark-content {
      &__title {
        @apply text-base;
      }
      &__desc {
        @apply text-sm;
      }
    }
    .vp-bookmark-meta {
      &__icon {
        @apply w-4 h-4;
      }
      &__author {
        @apply text-sm;
      }
    }
  }

  // size small style
  &.vp-bookmark-card--small {
    .vp-bookmark-content {
      @apply py-3 px-4;
      &__title {
        @apply text-sm;
      }
      &__desc {
        @apply text-xs;
      }
    }
    .vp-bookmark-meta {
      &__icon {
        @apply w-3.5 h-3.5;
      }
      &__author {
        @apply text-xs;
      }
    }
    .vp-bookmark-thumbnail {
      flex-basis: 13.5rem;
      @apply h-30;
    }
  }

  &.vp-bookmark-card--horizontal {
    @apply w-[720px];
    .vp-bookmark-wrapper {
      .vp-bookmark-thumbnail {
        @apply h-36;
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
