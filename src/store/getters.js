export default {
  isLoading (state) {
    return state.loading > 0
  },
  customersData (state) {
    return state.customers
  },
  getCountries (state) {
    return [...new Set(state.customers.map(item => item.country))].sort()
  },
  getCities (state) {
    return [...new Set(state.customers.map(item => item.city))].sort()
  },
  getOrdersByCustomerId (state) {
    return customerId => {
      return state.orders.filter(item => item.customerId === customerId)
    }
  },
  getSelectedCustomer (state) {
    return state.selectedCustomer
  },
}
