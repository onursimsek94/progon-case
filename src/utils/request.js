import axios from 'axios'
import { i18n } from '@/plugins/vue-i18n'

const BASE = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {},
})

const requestInterceptors = [
  [
    function (config) {
      config.headers.common[ 'accept-language' ] = i18n.locale
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  ],
]

requestInterceptors.forEach(interceptor => {
  BASE.interceptors.request.use(...interceptor)
})

export {
  BASE,
}
