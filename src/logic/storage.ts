import { useLocalStorage } from '@vueuse/core'

export const sharedLink = useLocalStorage('web-bookmark', 'Shared Link', { listenToStorageChanges: true })
