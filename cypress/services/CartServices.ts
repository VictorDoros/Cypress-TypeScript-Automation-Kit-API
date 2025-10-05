import Environment from '../fixtures/environment'

export default class Cart {
  createCart(env: Environment) {
    return cy.api({
      url: `${env.getEnvironment()}/carts`,
      method: 'POST',
    })
  }

  getCart(env: Environment, cartId: string) {
    return cy.api({
      url: `${env.getEnvironment()}/carts/${cartId}`,
      method: 'GET',
    })
  }

  addItemToCart(env: Environment, cartId: string, productId: string) {
    return cy.api({
      url: `${env.getEnvironment()}/carts/${cartId}/items`,
      method: 'POST',
      body: {
        productId: `${productId}`,
      },
    })
  }
}
