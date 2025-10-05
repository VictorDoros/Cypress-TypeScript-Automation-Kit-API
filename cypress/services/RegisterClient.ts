import Environment from '../fixtures/environment'
import { faker } from '@faker-js/faker'

export default class RegisterClient {
  registerClient(env: Environment) {
    return cy.api({
      url: `${env.getEnvironment()}/api-clients`,
      method: 'POST',
      body: {
        clientName: `${faker.person.firstName()}`,
        clientEmail: `${faker.internet.email()}`,
      },
    })
  }
}
