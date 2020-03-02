export class OrdersTransformer {
  static fetch (data) {
    return data.map(item => {
      return {
        ...item,
        orderDate: parseInt(item.orderDate.substr(6)),
        requiredDate: parseInt(item.requiredDate.substr(6)),
        shippedDate: parseInt(item.shippedDate.substr(6)),
      }
    })
  }
}
