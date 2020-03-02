import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Pagination,
  Input,
  Radio,
  RadioGroup,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Popover,
  Loading,
  Notification,
} from 'element-ui'
import { i18n } from '@/plugins/vue-i18n'
import locale from 'element-ui/lib/locale'

locale.i18n((key, value) => i18n.t(key, value))

Vue.use(Pagination)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = options => {
  const customClass = `${options.type}-notification`

  Notification({
    position: 'top-right',
    duration: 3000,
    customClass,
    ...options,
  })
}
