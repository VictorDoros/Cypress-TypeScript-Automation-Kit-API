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

    createCartAddItemUpdateQuantityItem(env: Environment, productName: string) {
    return ProductFlow.getListProductsAndReturnProductId(env, productName).then(
      (productId) => {
        return this.createCartAndReturnId(env).then((cartId) => {
          return this.cart
            .addItemToCart(env, cartId, productId)
            .then((addItemResponse) => {
              return addItemResponse.body.itemId
            })
            .then((itemId) => {
              return this.cart.getCart(env, cartId).then((getCartResponse) => {
                const initialQuantity = getCartResponse.body.items[0].quantity
                expect(initialQuantity).to.eq(1)
                return initialQuantity
              }).then((initialQuantity) => {
                return this.cart.updateQuantityItem(env, cartId, itemId).then((updateQuantityResponse) => {
                  expect(updateQuantityResponse.status).to.eq(204)
                }).then(() => {
                this.cart.getCart(env, cartId).then((getCartResponse) => {
                  const updatedQuantityItem = getCartResponse.body.items[0].quantity
                  expect(updatedQuantityItem).not.to.eq(initialQuantity)
                })
              })
              })
            })
        })
      }
    )
  }

    createCartAddItemReplaceItem(env: Environment, initialProductName: string, replacedProductName: string) {
    return ProductFlow.getListProductsAndReturnProductId(env, initialProductName).then(
      (initialProductId) => {
        return this.createCartAndReturnId(env).then((cartId) => {
          return this.cart
            .addItemToCart(env, cartId, initialProductId)
            .then((addItemResponse) => {
              return addItemResponse.body.itemId
            })
            .then((initialItemId) => {
              return this.cart.getCart(env, cartId).then((getCartResponse) => {
                expect(getCartResponse.body.items[0].productId).to.eq(initialProductId)
              })
              .then(() => {
              return ProductFlow.getListProductsAndReturnProductId(env, replacedProductName).then((replacedProductId) => {
                return this.cart.replaceItem(env, cartId, initialItemId, replacedProductId).then((replaceItemResponse) => {
                  expect(replaceItemResponse.status).to.eq(204)
                }).then(() =>{
              this.cart.getCart(env, cartId).then((getCartResponse) => {
                expect(initialProductId).not.to.eq(replacedProductId)
                expect(getCartResponse.body.items[0].productId).to.eq(replacedProductId)
              })
              })
              })
              })

            })            

        })
      }
    )
  }
}

export default new CartFlow
