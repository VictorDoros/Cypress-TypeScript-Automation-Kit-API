import OrderServices from '../services/OrderServices'
import CartServices from '../services/CartServices'
import CartFlow from './CartFlow'
import ProductFlow from './ProductFlow'
import Environment from '../fixtures/environment'
import Token from '../fixtures/token'

class OrderFlow {
  private orderServices = new OrderServices()
  private cartServices = new CartServices()

  /**
   * Creates a cart, adds a product to it, creates an order, and retrieves the order details.
   *
   * @param env - Target environment/config for API calls.
   * @param token - Authorization token for the request.
   * @param productName - Product name to be added to the cart.
   */
  createCartAddItemGetCartCreateOrder(
    env: Environment,
    token: Token,
    productName: string
  ) {
    return ProductFlow.getListProductsAndReturnProductId(env, productName).then(
      (productId) => {
        return CartFlow.createCartAndReturnId(env).then(({ cartId }) => {
          return this.cartServices
            .addItemToCart(env, cartId, productId)
            .then(() => {
              return this.orderServices.createOrder(env, token, cartId)
            })
            .then((createOrderResponse) => {
              const orderId = createOrderResponse.body.orderId
              return this.orderServices
                .getOrder(env, token, orderId)
                .then((getOrderResponse) => {
                  return { createOrderResponse, getOrderResponse }
                })
            })
        })
      }
    )
  }

  /**
   * Creates a cart, adds a product, creates an order, updates the order with a comment, and retrieves it.
   *
   * @param env - Target environment/config for API calls.
   * @param token - Authorization token for the request.
   * @param productName - Product name to add to the cart.
   * @param orderComment - Comment or note to update in the order.
   */
  createCartAddItemCreateOrderUpdateOrder(
    env: Environment,
    token: Token,
    productName: string,
    orderComment: string
  ) {
    return ProductFlow.getListProductsAndReturnProductId(env, productName).then(
      (productId) => {
        return CartFlow.createCartAndReturnId(env).then(({ cartId }) => {
          return this.cartServices
            .addItemToCart(env, cartId, productId)
            .then(() => {
              return this.orderServices.createOrder(env, token, cartId)
            })
            .then((createOrderResponse) => {
              const orderId = createOrderResponse.body.orderId
              return this.orderServices
                .updateOrder(env, token, orderId, orderComment)
                .then((updateOrderResponse) => {
                  return this.orderServices
                    .getOrder(env, token, orderId)
                    .then((getOrderResponse) => {
                      return { updateOrderResponse, getOrderResponse }
                    })
                })
            })
        })
      }
    )
  }

  /**
   * Creates a cart, adds a product, creates an order, deletes the order, and then fetches its details.
   *
   * @param env - Target environment/config for API calls.
   * @param token - Authorization token for the request.
   * @param productName - Product name to add before order creation.
   */
  createCartAddItemCreateOrderDeleteOrder(
    env: Environment,
    token: Token,
    productName: string
  ) {
    return ProductFlow.getListProductsAndReturnProductId(env, productName).then(
      (productId) => {
        return CartFlow.createCartAndReturnId(env).then(({ cartId }) => {
          return this.cartServices
            .addItemToCart(env, cartId, productId)
            .then(() => {
              return this.orderServices.createOrder(env, token, cartId)
            })
            .then((createOrderResponse) => {
              const orderId = createOrderResponse.body.orderId
              return this.orderServices
                .deleteOrder(env, token, orderId)
                .then((deleteOrderResponse) => {
                  return this.orderServices
                    .getOrder(env, token, orderId)
                    .then((getOrderResponse) => {
                      return { deleteOrderResponse, getOrderResponse, orderId }
                    })
                })
            })
        })
      }
    )
  }
}

export default new OrderFlow()
