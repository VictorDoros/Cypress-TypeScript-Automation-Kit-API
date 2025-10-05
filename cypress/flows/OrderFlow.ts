import OrderServices from '../services/OrderServices'
import CartServices from '../services/CartServices'
import CartFlow from './CartFlow'
import ProductFlow from './ProductFlow'
import Environment from '../fixtures/environment'
import Token from '../fixtures/token'

class OrderFlow {
  private orderServices = new OrderServices()
  private cartServices = new CartServices()

  createCartAddItemGetCartCreateOrder(env: Environment, token: Token, productName: string) {
    return ProductFlow.getListProductsAndReturnProductId(env, productName).then(
      (productId) => {
        return CartFlow.createCartAndReturnId(env).then((cartId) => {
          return this.cartServices.addItemToCart(env, cartId, productId)
          .then(() => {
            return this.orderServices.createOrder(env, token, cartId)
          }).then((createOrderResponse) => {
            expect(createOrderResponse.status).to.eq(201)
            expect(createOrderResponse.body.created).to.be.true
            
          })
        })
      }
    )
  }
}

export default new OrderFlow()
