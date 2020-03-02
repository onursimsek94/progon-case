import {
  INCREASE_LOADING,
  DECREASE_LOADING,
  GET_CUSTOMERS,
  GET_ORDERS,
  SET_SELECTED_CUSTOMER,
} from '@/store/mutation-types'

export default {
  [ INCREASE_LOADING ] (state) {
    state.loading += 1
  },
  [ DECREASE_LOADING ] (state) {
    state.loading -= 1
  },
  [ GET_CUSTOMERS ] (state, { customerData }) {
    state.customers = customerData
  },
  [ GET_ORDERS ] (state, { orderData }) {
    state.orders = orderData
  },
  [ SET_SELECTED_CUSTOMER ] (state, { customer }) {
    state.selectedCustomer = customer
  },
}
