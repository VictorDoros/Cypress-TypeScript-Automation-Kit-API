import CartServices from '../services/CartServices'
import ProductFlow from './ProductFlow'
import Environment from '../fixtures/environment'

class CartFlow {
  private cart = new CartServices()

  /**
   * Create a cart and return its id along with the raw create response.
   *
   * @param env - Target environment/config for the API calls.
   */
  createCartAndReturnId(env: Environment) {
    return this.cart.createCart(env).then((createCartResponse) => {
      return { cartId: createCartResponse.body.cartId, createCartResponse }
    })
  }

  /**
   * Create a cart and then fetch it.
   *
   * @param env - Target environment/config for the API calls.
   */
  createAndGetCart(env: Environment) {
    return this.createCartAndReturnId(env).then(
      ({ cartId, createCartResponse }) => {
        return this.cart.getCart(env, cartId).then((getCartResponse) => {
          return { createCartResponse, getCartResponse }
        })
      }
    )
  }

  /**
   * Create a cart, add a product by name, then fetch the cart.
   *
   * @param env - Target environment/config for the API calls.
   * @param productName - Human-readable product name to resolve to a product id.
   */
  createCartAddItemGetCart(env: Environment, productName: string) {
    return ProductFlow.getListProductsAndReturnProductId(env, productName).then(
      (productId) => {
        return this.createCartAndReturnId(env).then(({ cartId }) => {
          return this.cart
            .addItemToCart(env, cartId, productId)
            .then((addItemResponse) => {
              return this.cart.getCart(env, cartId).then((getCartResponse) => {
                return { addItemResponse, getCartResponse, productId }
              })
            })
        })
      }
    )
  }

  /**
   * Create a cart, add a product, update its quantity, and return quantities before/after.
   *
   * @param env - Target environment/config for the API calls.
   * @param productName - Product to add before updating its quantity.
   */
  createCartAddItemUpdateQuantityItem(env: Environment, productName: string) {
    return ProductFlow.getListProductsAndReturnProductId(env, productName).then(
      (productId) => {
        return this.createCartAndReturnId(env).then(({ cartId }) => {
          return this.cart
            .addItemToCart(env, cartId, productId)
            .then((addItemResponse) => {
              const itemId = addItemResponse.body.itemId
              return this.cart.getCart(env, cartId).then((getCartBefore) => {
                const initialQuantity = getCartBefore.body.items[0].quantity
                return this.cart
                  .updateQuantityItem(env, cartId, itemId)
                  .then((updateQuantityResponse) => {
                    return this.cart
                      .getCart(env, cartId)
                      .then((getCartAfter) => {
                        const updatedQuantity =
                          getCartAfter.body.items[0].quantity
                        return {
                          initialQuantity,
                          updateQuantityResponse,
                          updatedQuantity,
                        }
                      })
                  })
              })
            })
        })
      }
    )
  }

  /**
   * Create a cart, add an initial product, then replace it with another product.
   *
   * @param env - Target environment/config for the API calls.
   * @param initialProductName - Product to add first.
   * @param replacedProductName - Product that will replace the initial item.
   */
  createCartAddItemReplaceItem(
    env: Environment,
    initialProductName: string,
    replacedProductName: string
  ) {
    return ProductFlow.getListProductsAndReturnProductId(
      env,
      initialProductName
    ).then((initialProductId) => {
      return this.createCartAndReturnId(env).then(({ cartId }) => {
        return this.cart
          .addItemToCart(env, cartId, initialProductId)
          .then((addItemResponse) => {
            const initialItemId = addItemResponse.body.itemId
            return this.cart
              .getCart(env, cartId)
              .then((getCartResponseBefore) => {
                const initialProductId =
                  getCartResponseBefore.body.items[0].productId
                return ProductFlow.getListProductsAndReturnProductId(
                  env,
                  replacedProductName
                ).then((replacedProductId) => {
                  return this.cart
                    .replaceItem(env, cartId, initialItemId, replacedProductId)
                    .then((replaceItemResponse) => {
                      return this.cart
                        .getCart(env, cartId)
                        .then((getCartResponseAfter) => {
                          return {
                            initialProductId,
                            replaceItemResponse,
                            getCartResponseBefore,
                            getCartResponseAfter,
                            replacedProductId,
                          }
                        })
                    })
                })
              })
          })
      })
    })
  }
}

export default new CartFlow()
