/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'

console.info('[chrome-web-bookmark] Hello world from content script')

// communication example: send previous tab title from background page
onMessage('tab-prev', ({ data }) => {
  console.log(`[chrome-web-bookmark] Navigate from page "${data.title}"`)
})
