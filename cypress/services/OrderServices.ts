import Environment from '../fixtures/environment'
import Token from '../fixtures/token'
import { faker } from '@faker-js/faker'

export default class Order {
  createOrder(env: Environment, token: Token, cartId: string) {
    return cy.api({
      url: `${env.getEnvironment()}/orders`,
      method: 'POST',
      body: {
        cartId: `${cartId}`,
        customerName: `${faker.person.firstName()} ${faker.person.lastName()}`,
      },
      headers: {
        Authorization: `Bearer ${token.getToken()}`,
      },
    })
  }
}
