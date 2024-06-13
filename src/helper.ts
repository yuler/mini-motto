import { $api } from './api'

/**
 * Promisify a function with wx api style callback.
 */
export function $promisify<T extends (...args: any[]) => any>(api: T) {
  type SuccessCallback = NonNullable<Parameters<T>[0]>['success']
  type SuccessCallbackResult = Parameters<NonNullable<SuccessCallback>>[0]
  return (options?: Parameters<T>[0]) =>
    new Promise<SuccessCallbackResult>((resolve, reject) => {
      return api({
        success: resolve,
        fail: reject,
        ...options,
      })
    })
}

/**
 * Handle wx.login with retry
 */
// TODO: 401?
export async function $login({ retry = 3 }: { retry: number }) {
  try {
    const { code } = await $promisify(wx.login)()
    const { token } = await $api({
      url: '/sessions',
      method: 'POST',
      data: {
        code,
      },
    })
    return token
  } catch (error: any) {
    console.error(error)
    if (retry > 0) {
      await $login({ retry: retry - 1 })
    } else {
      throw new Error('Login failed')
    }
  }
}
