import OrderServices from '../services/OrderServices'
import CartServices from '../services/CartServices'
import CartFlow from './CartFlow'
import ProductFlow from './ProductFlow'
import Environment from '../fixtures/environment'
import Token from '../fixtures/token'

class OrderFlow {
  private orderServices = new OrderServices()
  private cartServices = new CartServices()

  createCartAddItemGetCartCreateOrder(
    env: Environment,
    token: Token,
    productName: string
  ) {
    return ProductFlow.getListProductsAndReturnProductId(env, productName).then(
      (productId) => {
        return CartFlow.createCartAndReturnId(env).then((cartId) => {
          return this.cartServices
            .addItemToCart(env, cartId, productId)
            .then(() => {
              return this.orderServices.createOrder(env, token, cartId)
            })
            .then((createOrderResponse) => {
              expect(createOrderResponse.status).to.eq(201)
              expect(createOrderResponse.body.created).to.be.true
              return createOrderResponse.body.orderId
            })
            .then((orderId) => {
              this.orderServices
                .getOrder(env, token, orderId)
                .then((getOrderResponse) => {
                  expect(getOrderResponse.body.items.length).to.eq(1)
                  expect(getOrderResponse.body.comment).is.empty
                })
            })
        })
      }
    )
  }

  createCartAddItemCreateOrderUpdateOrder(
    env: Environment,
    token: Token,
    productName: string,
    orderComment: string
  ) {
    return ProductFlow.getListProductsAndReturnProductId(env, productName).then(
      (productId) => {
        return CartFlow.createCartAndReturnId(env).then((cartId) => {
          return this.cartServices
            .addItemToCart(env, cartId, productId)
            .then(() => {
              return this.orderServices.createOrder(env, token, cartId)
            })
            .then((createOrderResponse) => {
              return createOrderResponse.body.orderId
            })
            .then((orderId) => {
              this.orderServices
                .updateOrder(env, token, orderId, orderComment)
                .then((updateOrderResponse) => {
                  expect(updateOrderResponse.status).to.eq(204)
                })
                .then(() => {
                  this.orderServices
                    .getOrder(env, token, orderId)
                    .then((getOrderResponse) => {
                      expect(getOrderResponse.body.comment).to.eq(orderComment)
                    })
                })
            })
        })
      }
    )
  }

  createCartAddItemCreateOrderDeleteOrder(
    env: Environment,
    token: Token,
    productName: string
  ) {
    return ProductFlow.getListProductsAndReturnProductId(env, productName).then(
      (productId) => {
        return CartFlow.createCartAndReturnId(env).then((cartId) => {
          return this.cartServices
            .addItemToCart(env, cartId, productId)
            .then(() => {
              return this.orderServices.createOrder(env, token, cartId)
            })
            .then((createOrderResponse) => {
              return createOrderResponse.body.orderId
            })
            .then((orderId) => {
              this.orderServices
                .deleteOrder(env, token, orderId)
                .then((deleteOrderResponse) => {
                  expect(deleteOrderResponse.status).to.eq(204)
                })
                .then(() => {
                  this.orderServices
                    .getOrder(env, token, orderId)
                    .then((getOrderResponse) => {
                      expect(getOrderResponse.status).to.eq(404)
                      expect(getOrderResponse.body.error).to.eq(
                        `No order with id ${orderId}.`
                      )
                    })
                })
            })
        })
      }
    )
  }
}

export default new OrderFlow()
