import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/locale'
import Cookies from 'js-cookie'

Vue.use(VueI18n)

let locale = Cookies.get('sitelang')
// eslint-disable-next-line no-prototype-builtins
if (!messages.hasOwnProperty(locale)) {
  locale = 'en'
}

export const i18n = new VueI18n({
  locale,
  fallbackLocale: 'en',
  messages,
})

export default {
  i18n,
}
