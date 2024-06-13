import type { IApp } from '../app'
import type { Quote } from '../types'
import enhancePage from '../enhance-page'

const $app = getApp<IApp>()

enhancePage({
  data: {
    quote: null as Quote | null,
  },
  async onLoad() {
    const data = await $app.$api({
      url: '/quotes/today',
      method: 'GET',
    })
    this.setData({ quote: data })
  },
})
