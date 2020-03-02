import {
  INCREASE_LOADING,
  DECREASE_LOADING,
  GET_CUSTOMERS,
  GET_ORDERS,
  SET_SELECTED_CUSTOMER,
} from '@/store/mutation-types'
import { CustomersProxy } from '@/proxies/CustomersProxy'
import { OrdersProxy } from '@/proxies/OrdersProxy'
import { OrdersTransformer } from '@/transformers/OrdersTransformer'

const request = {
  customers: null,
  orders: null,
}

export default {
  increaseLoading ({ commit }) {
    commit(INCREASE_LOADING)
  },
  decreaseLoading ({ commit }) {
    commit(DECREASE_LOADING)
  },
  getCustomers ({ commit, state, dispatch }) {
    if (request.customers) {
      return request.customers
    }
    return new Promise((resolve, reject) => {
      if (state.customers.length) {
        resolve(state.customers)
      } else {
        dispatch('increaseLoading')

        request.customers = new CustomersProxy()
          .all()

        request.customers
          .then(response => {
            commit(GET_CUSTOMERS, { customerData: response.customers })
            resolve(response.customers)
          })
          .catch(reject)
          .finally(() => {
            request.customers = null
            dispatch('decreaseLoading')
          })
      }
    })
  },
  getOrders ({ commit, state, dispatch }) {
    if (request.orders) {
      return request.orders
    }
    return new Promise((resolve, reject) => {
      if (state.orders.length) {
        resolve(state.orders)
      } else {
        dispatch('increaseLoading')

        request.orders = new OrdersProxy()
          .all()

        request.orders
          .then(response => {
            const orderData = OrdersTransformer.fetch(response.results)

            commit(GET_ORDERS, { orderData })
            resolve(orderData)
          })
          .catch(reject)
          .finally(() => {
            request.orders = null
            dispatch('decreaseLoading')
          })
      }
    })
  },
  setSelectedCustomer ({ commit }, customer) {
    commit(SET_SELECTED_CUSTOMER, { customer })
  },
}
