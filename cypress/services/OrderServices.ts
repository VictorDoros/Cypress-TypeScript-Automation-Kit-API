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

getOrder(env: Environment, token: Token, orderId: string) {
    return cy.api({
      url: `${env.getEnvironment()}/orders/${orderId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.getToken()}`,
      },
      failOnStatusCode: false,
    })
  }

    updateOrder(env: Environment, token: Token, orderId: string, orderComment: string) {
    return cy.api({
      url: `${env.getEnvironment()}/orders/${orderId}`,
      method: 'PATCH',
      body: {
        comment: `${orderComment}`,
      },
      headers: {
        Authorization: `Bearer ${token.getToken()}`,
      },
    })
  }

    deleteOrder(env: Environment, token: Token, orderId: string) {
    return cy.api({
      url: `${env.getEnvironment()}/orders/${orderId}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.getToken()}`,
      },
    })
  }

}
