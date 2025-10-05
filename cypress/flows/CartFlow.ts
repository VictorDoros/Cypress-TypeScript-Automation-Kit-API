import CartServices from '../services/CartServices'
import ProductFlow from './ProductFlow'
import Environment from '../fixtures/environment'

class CartFlow {
  private cart = new CartServices()

  createCartAndReturnId(env: Environment) {
    return this.cart.createCart(env).then((response) => {
      expect(response.status).to.eq(201)
      return response.body.cartId
    })
  }

  createAndGetCart(env: Environment) {
    return this.createCartAndReturnId(env).then((cartId) => {
      return this.cart.getCart(env, cartId).then((getCartResponse) => {
        expect(getCartResponse.status).to.eq(200)
        expect(getCartResponse.body.items).to.be.an('array').and.empty
      })
    })
  }

  createCartAddItemGetCart(env: Environment, productName: string) {
    return ProductFlow.getListProductsAndReturnProductId(env, productName).then(
      (productId) => {
        return this.createCartAndReturnId(env).then((cartId) => {
          return this.cart
            .addItemToCart(env, cartId, productId)
            .then((addCartResponse) => {
              expect(addCartResponse.status).to.eq(201)
              expect(addCartResponse.body.created).to.be.true
            })
            .then(() => {
              return this.cart.getCart(env, cartId).then((getCartResponse) => {
                expect(getCartResponse.body.items.length).eq(1)
                expect(getCartResponse.body.items[0].productId).to.eq(productId)
              })
            })
        })
      }
    )
  }
}

export default new CartFlow
