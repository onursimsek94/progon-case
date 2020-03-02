import { BaseProxy } from '@/proxies/BaseProxy'

export class CustomersProxy extends BaseProxy {
  constructor ({ parameters = {} } = {}) {
    super({
      endpoint: 'cached/customers.json',
      parameters,
    })
  }
}
