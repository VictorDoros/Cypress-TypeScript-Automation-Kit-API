import Environment from '../fixtures/environment'

export default class Cart {
  createCart(env: Environment) {
    return cy.step('Create cart').api({
      url: `${env.getEnvironment()}/carts`,
      method: 'POST',
    })
  }

  getCart(env: Environment, cartId: string) {
    return cy.step('Get cart').api({
      url: `${env.getEnvironment()}/carts/${cartId}`,
      method: 'GET',
    })
  }

  addItemToCart(env: Environment, cartId: string, productId: string) {
    return cy.step('Add item to cart').api({
      url: `${env.getEnvironment()}/carts/${cartId}/items`,
      method: 'POST',
      body: {
        productId: `${productId}`,
      },
    })
  }

  updateQuantityItem(env: Environment, cartId: string, itemId: string) {
    return cy.step('Update quantity of item').api({
      url: `${env.getEnvironment()}/carts/${cartId}/items/${itemId}`,
      method: 'PATCH',
      body: {
        quantity: Math.floor(Math.random() * (9 - 2) + 2),
      },
    })
  }

  replaceItem(
    env: Environment,
    cartId: string,
    initialItemId: string,
    replacedProductId: string
  ) {
    return cy.step('Replace item').api({
      url: `${env.getEnvironment()}/carts/${cartId}/items/${initialItemId}`,
      method: 'PUT',
      body: {
        productId: `${replacedProductId}`,
      },
    })
  }
}
