import type { IApp } from '../app'
import type { Quote } from '../types'
import enhancePage from '../enhance-page'
import confetti from '../lib/confetti'

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

  onTest() {
    const query = wx.createSelectorQuery()
    query
      .select('#canvas')
      .fields({ node: true, size: true })
      .exec(res => {
        const canvas = res[0].node
        console.log(canvas)
        canvas.confetti =
          canvas.confetti || confetti.create(canvas, { resize: true })
        canvas.confetti({
          particleCount: 100,
          spread: 70,
        })
      })
  },
})
