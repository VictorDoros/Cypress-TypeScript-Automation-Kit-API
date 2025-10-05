import Environment from '../fixtures/environment'

export default class Products {
  getAllProducts(env: Environment) {
    return cy.api({
      url: `${env.getEnvironment()}/products`,
      method: 'GET',
    })
  }

  getSingleProduct(env: Environment, productId: string) {
    return cy.api({
      url: `${env.getEnvironment()}/products/${productId}`,
      method: 'GET',
    })
  }
}
