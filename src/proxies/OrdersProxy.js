import { BaseProxy } from '@/proxies/BaseProxy'

export class OrdersProxy extends BaseProxy {
  constructor ({ parameters = {} } = {}) {
    super({
      endpoint: 'query/orders.json',
      parameters,
    })
  }
}
