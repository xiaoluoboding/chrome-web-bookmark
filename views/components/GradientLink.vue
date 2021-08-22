<script lang="ts">
import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'GradientLink',
  props: {
    to: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    return () => h(
      'a',
      {
        class: ['gradient-link', 'gradient-text'],
        href: props.to,
        target: '_blank',
      },
      slots,
    )
  },
})
</script>

<style scoped>
.gradient-link {
  @apply p-1;
  @apply no-underline;
  transition: all .2s ease;
}

.gradient-link:hover {
  box-shadow: inset 0 -2px 0 #0ab9e6;
}
</style>
